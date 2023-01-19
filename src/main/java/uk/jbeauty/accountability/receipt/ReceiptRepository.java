package uk.jbeauty.accountability.receipt;

import org.springframework.data.r2dbc.repository.R2dbcRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.UUID;

interface ReceiptRepository extends R2dbcRepository<Receipt, UUID> {

  Mono<Receipt> findByIdAndCreatedBy(UUID id, String createdBy);

  Flux<Receipt> findAllByCreatedByOrderByCreatedAtDesc(String createdBy);

  Mono<Receipt> deleteByIdAndCreatedBy(UUID id, String createdBy);

}
