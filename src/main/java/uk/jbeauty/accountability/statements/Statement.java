package uk.jbeauty.accountability.statements;

import uk.jbeauty.accountability.receipt.Receipt;

import java.util.List;

public record Statement(
    List<Receipt> receipts
) {
}
