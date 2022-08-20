package uk.jbeauty.accountability.receipt;

import java.time.LocalDate;
import java.util.List;

public record IncomeReceipt(
    LocalDate date,
    List<Long> treatments,
    Long amount
) {
}
