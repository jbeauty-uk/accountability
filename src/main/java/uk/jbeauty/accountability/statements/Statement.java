package uk.jbeauty.accountability.statements;

import uk.jbeauty.accountability.receipt.Receipt;

import java.util.List;

public record Statement(
    Integer year,
    Integer month,
    Integer day,
    List<Receipt> receipts
) {
}
