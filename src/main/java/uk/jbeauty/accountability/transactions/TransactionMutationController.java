package uk.jbeauty.accountability.transactions;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.Arguments;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Controller
class TransactionMutationController extends TransactionController {

  TransactionMutationController(TransactionService transactionService) {
    super(transactionService);
  }

  @MutationMapping
  Mono<Transaction> addTransaction(@Arguments Transaction transaction) {
    return transactionService.addTransaction(transaction);
  }

  @MutationMapping
  Mono<Transaction> deleteTransaction(@Argument UUID id) {
    return transactionService.deleteTransaction(id);
  }

}
