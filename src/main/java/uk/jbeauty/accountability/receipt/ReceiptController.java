package uk.jbeauty.accountability.receipt;

abstract class ReceiptController {

  protected final ReceiptService receiptService;

  protected ReceiptController(ReceiptService receiptService) {
    this.receiptService = receiptService;
  }

}
