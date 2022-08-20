package uk.jbeauty.accountability.receipt;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("receipt")
class ReceiptController {

  private final List<IncomeReceipt> incomeReceipts = new ArrayList<>();

  @PostMapping("income")
  Mono<Void> submitIncomeReceipt(@RequestBody IncomeReceipt incomeReceipt) {
    incomeReceipts.add(incomeReceipt);
    return Mono.empty();
  }

}
