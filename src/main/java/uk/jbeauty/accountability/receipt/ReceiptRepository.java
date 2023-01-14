package uk.jbeauty.accountability.receipt;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;

interface ReceiptRepository2 extends ReactiveCrudRepository<Receipt, Long> {



}
