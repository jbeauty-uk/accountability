package uk.jbeauty.accountability.transactions;

import java.time.LocalDate;
import java.util.UUID;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import uk.jbeauty.accountability.transactions.range.TransactionRange;
import uk.jbeauty.accountability.transactions.range.TransactionRangeService;
import uk.jbeauty.accountability.utils.DateUtils;

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
  Mono<TransactionRange> getTransactionRange() {
    return transactionRangeService.getTransactionRange();
  }

  @QueryMapping
  Mono<Transaction> getTransactionById(@Argument UUID id) {
    return transactionService.findById(id);
  }

  @QueryMapping
  Flux<Transaction> getTransactions(@Argument Integer year, @Argument Integer month, @Argument Integer day) {
    var range = DateUtils.getDateRange(year, month, day);
    return transactionService.findAllBetweenDates(range.to(), range.from());
  }

  @QueryMapping
  Flux<Transaction> getTransactionsBetween(@Argument LocalDate to, @Argument LocalDate from) {
    return transactionService.findAllBetweenDates(to, from);
  }

}
