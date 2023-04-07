package uk.jbeauty.accountability.transactions.range;

import io.r2dbc.spi.Row;
import java.util.Objects;
import org.slf4j.LoggerFactory;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.r2dbc.core.RowsFetchSpec;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import uk.jbeauty.accountability.utils.SecurityUtils;

import java.time.LocalDate;

@Service
public class TransactionRangeService {

  private final DatabaseClient databaseClient;

  TransactionRangeService(DatabaseClient databaseClient) {
    this.databaseClient = databaseClient;
  }

  public Mono<TransactionRange> getTransactionRange() {
    var query = databaseClient.sql("""
        SELECT
          MIN(t.date),
          MAX(t.date)
        FROM transactions t
        WHERE t.created_by = :createdBy;
        """);

    return SecurityUtils.getPrincipal()
        .mapNotNull(AbstractAuthenticationToken::getName)
        .mapNotNull(name -> query
            .bind("createdBy", name)
            .map(this::mapResult)
        )
        .flatMap(RowsFetchSpec::one);
  }

  private TransactionRange mapResult(Row row) {
    return new TransactionRange(
        row.get("min", LocalDate.class),
        row.get("max", LocalDate.class)
    );
  }

}
