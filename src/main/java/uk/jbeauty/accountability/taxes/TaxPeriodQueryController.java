package uk.jbeauty.accountability.taxes;

import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Flux;

@Controller
class TaxPeriodQueryController {

  private final TaxPeriodService taxPeriodService;

  TaxPeriodQueryController(TaxPeriodService taxPeriodService) {
    this.taxPeriodService = taxPeriodService;
  }

  @QueryMapping
  Flux<TaxPeriod> getTaxPeriods() {
    return taxPeriodService.getTaxPeriods();
  }

}
