package uk.jbeauty.accountability.receipt;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Controller
class ReceiptQueryController extends ReceiptController {

  ReceiptQueryController(ReceiptService receiptService) {
    super(receiptService);
  }

  @QueryMapping
  Mono<Receipt> getReceiptById(@Argument UUID id) {
    return receiptService.findById(id);
  }
}
