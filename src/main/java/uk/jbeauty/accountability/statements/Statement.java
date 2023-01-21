package uk.jbeauty.accountability.statements;

import uk.jbeauty.accountability.transactions.Transaction;

import java.util.List;

public record Statement(
    List<Transaction> transactions
) {
}
