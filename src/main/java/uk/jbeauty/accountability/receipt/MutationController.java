package uk.jbeauty.accountability.receipt.datafetchers;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.security.oauth2.server.resource.authentication.BearerTokenAuthentication;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Mono;
import uk.jbeauty.accountability.receipt.Receipt;
import uk.jbeauty.accountability.receipt.ReceiptService;
import uk.jbeauty.accountability.receipt.ReceiptType;

import java.time.LocalDate;

@Controller
class MutationController extends ReceiptController {

  MutationController(ReceiptService receiptService) {
    super(receiptService);
  }

  @MutationMapping
  Mono<Receipt> addReceipt(BearerTokenAuthentication principal,
                           @Argument ReceiptType type,
                           @Argument LocalDate date,
                           @Argument String details,
                           @Argument Long amount) {
    return receiptService.addReceipt(principal.getName(), type, date, details, amount);
  }

  @MutationMapping
  Mono<Receipt> deleteReceipt(BearerTokenAuthentication principal,
                              @Argument Long id) {
    return receiptService.deleteReceipt(id, principal.getName());
  }

}
