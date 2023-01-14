package uk.jbeauty.accountability.receipt.datafetchers;

import uk.jbeauty.accountability.receipt.ReceiptService;

abstract class ReceiptController {

  protected final ReceiptService receiptService;

  protected ReceiptController(ReceiptService receiptService) {
    this.receiptService = receiptService;
  }

}
