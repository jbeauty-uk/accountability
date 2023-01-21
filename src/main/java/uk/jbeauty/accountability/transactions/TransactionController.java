package uk.jbeauty.accountability.transactions;

abstract class TransactionController {

  protected final TransactionService transactionService;

  protected TransactionController(TransactionService transactionService) {
    this.transactionService = transactionService;
  }

}
