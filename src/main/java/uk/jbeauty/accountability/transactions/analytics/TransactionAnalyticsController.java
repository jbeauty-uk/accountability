package uk.jbeauty.accountability.transactions.analytics;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.util.List;

@Controller
class TransactionAnalyticsController {

  private final TransactionAnalyticsService service;

  TransactionAnalyticsController(TransactionAnalyticsService service) {
    this.service = service;
  }

  @QueryMapping
  Mono<List<TransactionAnalytics>> getTransactionAnalyticsInRange(@Argument LocalDate to,
                                                                  @Argument LocalDate from) {
    return service.getResults(to, from).collectList();
  }

}
