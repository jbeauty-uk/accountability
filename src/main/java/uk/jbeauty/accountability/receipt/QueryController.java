package uk.jbeauty.accountability.receipt.datafetchers;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import uk.jbeauty.accountability.receipt.Receipt;
import uk.jbeauty.accountability.receipt.ReceiptService;

@Controller
class QueryController extends ReceiptController {

  QueryController(ReceiptService receiptService) {
    super(receiptService);
  }

  @QueryMapping
  Flux<Receipt> getReceipts() {
    return receiptService.findAll();
  }

  @QueryMapping
  Mono<Receipt> getReceiptById(@Argument Long id) {
    return receiptService.findById(id);
  }

}
