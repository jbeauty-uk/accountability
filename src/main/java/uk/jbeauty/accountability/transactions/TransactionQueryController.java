package uk.jbeauty.accountability.transactions;

import java.util.UUID;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Mono;
import uk.jbeauty.accountability.transactions.range.TransactionRange;
import uk.jbeauty.accountability.transactions.range.TransactionRangeService;

@Controller
class TransactionQueryController {

  private final TransactionRangeService transactionRangeService;
  private final TransactionService transactionService;

  TransactionQueryController(TransactionRangeService transactionRangeService,
                             TransactionService transactionService) {
    this.transactionRangeService = transactionRangeService;
    this.transactionService = transactionService;
  }

  @QueryMapping
  Mono<Transaction> getTransactionById(@Argument UUID id) {
    return transactionService.findById(id);
  }

  @QueryMapping
  Mono<TransactionRange> getTransactionRange() {
    return transactionRangeService.getTransactionRange();
  }
}
