package uk.jbeauty.accountability.utils;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Objects;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;
import uk.jbeauty.accountability.transactions.DateRange;

public class DateUtils {

  public static DateRange getDateRange(@NonNull Integer year,
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

  private DateUtils() {
  }
}
