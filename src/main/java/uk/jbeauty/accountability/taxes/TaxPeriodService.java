package uk.jbeauty.accountability.taxes;

import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public class TaxPeriodService {

  private final TaxPeriodRepository taxPeriodRepository;

  TaxPeriodService(TaxPeriodRepository taxPeriodRepository) {
    this.taxPeriodRepository = taxPeriodRepository;
  }

  Flux<TaxPeriod> getTaxPeriods() {
    return taxPeriodRepository.findAll();
  }

}
