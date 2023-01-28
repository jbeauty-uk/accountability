package uk.jbeauty.accountability.transactions.range;

import java.time.LocalDate;

public record TransactionRange(
    LocalDate from,
    LocalDate to
) {
}
