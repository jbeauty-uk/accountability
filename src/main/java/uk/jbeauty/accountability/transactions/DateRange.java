package uk.jbeauty.accountability.transactions;

import java.time.LocalDate;

public record DateRange(
    LocalDate from,
    LocalDate to
) {
}
