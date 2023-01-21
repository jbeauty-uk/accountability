package uk.jbeauty.accountability.transactions;

import org.springframework.data.r2dbc.repository.R2dbcRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.util.UUID;

interface TransactionRepository extends R2dbcRepository<Transaction, UUID> {

  Mono<Transaction> findByIdAndCreatedBy(UUID id, String createdBy);

  Mono<Transaction> deleteByIdAndCreatedBy(UUID id, String createdBy);

  Flux<Transaction> findAllByCreatedByAndDateBetweenOrderByDateDescCreatedAtDesc(String createdBy, LocalDate from, LocalDate to);

}
