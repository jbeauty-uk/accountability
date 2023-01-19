package uk.jbeauty.accountability.receipt;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.Arguments;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Controller
class MutationController extends ReceiptController {

  MutationController(ReceiptService receiptService) {
    super(receiptService);
  }

  @MutationMapping
  Mono<Receipt> addReceipt(@Arguments Receipt receipt) {
    return receiptService.addReceipt(receipt);
  }

  @MutationMapping
  Mono<Receipt> deleteReceipt(@Argument UUID id) {
    return receiptService.deleteReceipt(id);
  }

}
