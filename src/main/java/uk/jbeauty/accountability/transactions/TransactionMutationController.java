package uk.jbeauty.accountability.transactions;

import java.time.LocalDate;
import java.util.UUID;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.Arguments;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Mono;

@Controller
class TransactionMutationController {

  private final TransactionService transactionService;

  TransactionMutationController(TransactionService transactionService) {
    this.transactionService = transactionService;
  }

  @MutationMapping
  Mono<Transaction> addTransaction(@Arguments Transaction transaction) {
    return transactionService.addTransaction(transaction);
  }

  @MutationMapping
  Mono<Transaction> updateTransaction(@Argument UUID id,
                                      @Argument LocalDate date,
                                      @Argument String details,
                                      @Argument Long amount) {
    return transactionService.updateTransaction(id, date, details, amount);
  }

  @MutationMapping
  Mono<Transaction> deleteTransaction(@Argument UUID id) {
    return transactionService.deleteTransaction(id);
  }

}
