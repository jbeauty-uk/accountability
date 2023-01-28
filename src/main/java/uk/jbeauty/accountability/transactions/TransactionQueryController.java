package uk.jbeauty.accountability.transactions;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Mono;
import uk.jbeauty.accountability.transactions.range.TransactionRange;
import uk.jbeauty.accountability.transactions.range.TransactionRangeService;

import java.util.UUID;

@Controller
class TransactionQueryController extends TransactionController {

  private final TransactionRangeService transactionRangeService;

  TransactionQueryController(TransactionService transactionService,
                             TransactionRangeService transactionRangeService) {
    super(transactionService);
    this.transactionRangeService = transactionRangeService;
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
