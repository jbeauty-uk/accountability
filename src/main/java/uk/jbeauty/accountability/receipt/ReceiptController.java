package uk.jbeauty.accountability.receipt;

import lombok.AllArgsConstructor;
import org.springframework.security.oauth2.server.resource.authentication.BearerTokenAuthentication;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("receipts")
@AllArgsConstructor
class ReceiptController {

  private final ReceiptService receiptService;

  @GetMapping
  Flux<Receipt> receipts(BearerTokenAuthentication authentication) {
    return receiptService.findAll(authentication.getName());
  }

  @PostMapping
  Mono<Receipt> createReceipt(BearerTokenAuthentication authentication,
                              @RequestBody Receipt receipt) {
    return receiptService.createReceipt(authentication.getName(), receipt);
  }

}
