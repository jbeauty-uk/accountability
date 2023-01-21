package uk.jbeauty.accountability.statements;

import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import uk.jbeauty.accountability.receipt.ReceiptService;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Objects;

@Service
class StatementService {

  private final ReceiptService receiptService;

  StatementService(ReceiptService receiptService) {
    this.receiptService = receiptService;
  }

  Mono<Statement> getStatementInRange(LocalDate to, LocalDate from) {
    return receiptService.findAllBetweenDates(to, from)
        .collectList()
        .map(Statement::new);
  }

  Mono<Statement> getStatement(@NonNull Integer year,
                               @Nullable Integer month,
                               @Nullable Integer day) {
    var dateRange = getDateRange(year, month, day);

    return getStatementInRange(dateRange.to(), dateRange.from());
  }

  DateRange getDateRange(@NonNull Integer year,
                         @Nullable Integer month,
                         @Nullable Integer day) {
    // with only a year
    if (Objects.isNull(month) && Objects.isNull(day)) {
      var localDate = LocalDate.of(year, 1, 1);
      return new DateRange(
          localDate,
          localDate.plus(1, ChronoUnit.YEARS)
      );
    }

    // with a year and a month
    if (!Objects.isNull(month) && Objects.isNull(day)) {
      var localDate = LocalDate.of(year, month, 1);
      return new DateRange(
          localDate,
          localDate.plus(1, ChronoUnit.MONTHS)
      );
    }

    if (Objects.isNull(month)) {
      throw new RuntimeException("Invalid year, month or day");
    }

    var localDate = LocalDate.of(year, month, day);
    return new DateRange(localDate, localDate);
  }

  record DateRange(
      LocalDate from,
      LocalDate to
  ) {
  }

}
