package uk.jbeauty.accountability.transactions.analytics;

import io.r2dbc.spi.Row;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.r2dbc.core.RowsFetchSpec;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import uk.jbeauty.accountability.utils.SecurityUtils;

import java.time.LocalDate;

@Service
public class TransactionAnalyticsService {

  private final DatabaseClient databaseClient;

  TransactionAnalyticsService(DatabaseClient databaseClient) {
    this.databaseClient = databaseClient;
  }

  public Flux<TransactionAnalytics> getResults(LocalDate to, LocalDate from) {
    var query = databaseClient.sql("""
        SELECT
            unnest(string_to_array(trim(replace(lower(details), ', ', ',')), ',')) detail,
            count(*) count,
            round(avg(amount), 0) average,
            min(amount) min,
            max(amount) max
        FROM transactions
        WHERE created_by = :createdBy
          AND details IS NOT NULL
          AND details != ''
          AND date BETWEEN :from AND :to
        GROUP BY detail
        ORDER BY count(*) DESC;
        """);

    return SecurityUtils.getPrincipal()
        .mapNotNull(AbstractAuthenticationToken::getName)
        .mapNotNull(name -> query
            .bind("createdBy", name)
            .bind("to", to)
            .bind("from", from)
            .map(this::mapResult)
        )
        .flatMapMany(RowsFetchSpec::all);
  }

  private TransactionAnalytics mapResult(Row row) {
    return new TransactionAnalytics(
        row.get("detail", String.class),
        row.get("count", Long.class),
        row.get("min", Long.class),
        row.get("average", Long.class),
        row.get("max", Long.class)
    );
  }

}
