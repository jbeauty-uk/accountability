package uk.jbeauty.accountability.transactions;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import uk.jbeauty.accountability.utils.SecurityUtils;

import java.time.Clock;
import java.time.LocalDate;
import java.util.UUID;

@Service
public class TransactionService {

  private final TransactionRepository repository;
  private final Clock clock;

  TransactionService(TransactionRepository repository, Clock clock) {
    this.repository = repository;
    this.clock = clock;
  }

  Mono<Transaction> findById(UUID id) {
    return SecurityUtils.getPrincipal()
        .map(AbstractAuthenticationToken::getName)
        .flatMap(username -> repository.findByIdAndCreatedBy(id, username));
  }

  public Flux<Transaction> findAllBetweenDates(LocalDate to, LocalDate from) {
    return SecurityUtils.getPrincipal()
        .map(AbstractAuthenticationToken::getName)
        .flatMapMany(createdBy -> repository.findAllByCreatedByAndDateBetweenOrderByDateDescCreatedAtDesc(createdBy, from, to));
  }

  public Mono<Transaction> addTransaction(Transaction transaction) {
    return SecurityUtils.getPrincipal()
        .map(AbstractAuthenticationToken::getName)
        .map(username -> {
          transaction.setCreatedBy(username);
          transaction.setCreatedAt(clock.instant());
          return transaction;
        })
        .flatMap(repository::save);
  }

  public Mono<Transaction> updateTransaction(UUID id,
                                             LocalDate date,
                                             String details,
                                             Long amount) {
    return SecurityUtils.getPrincipal()
        .map(AbstractAuthenticationToken::getName)
        .flatMap(name -> repository.findByIdAndCreatedBy(id, name))
        .map(transaction -> {
          transaction.setDate(date);
          transaction.setDetails(details);
          transaction.setAmount(amount);
          return transaction;
        })
        .flatMap(repository::save);
  }

  public Mono<Transaction> deleteTransaction(UUID id) {
    return SecurityUtils.getPrincipal()
        .map(AbstractAuthenticationToken::getName)
        .flatMap(username -> repository.deleteByIdAndCreatedBy(id, username));
  }

}
