package uk.jbeauty.accountability.transactions;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Controller
class TransactionQueryController extends TransactionController {

  TransactionQueryController(TransactionService transactionService) {
    super(transactionService);
  }

  @QueryMapping
  Mono<Transaction> getTransactionById(@Argument UUID id) {
    return transactionService.findById(id);
  }
}
