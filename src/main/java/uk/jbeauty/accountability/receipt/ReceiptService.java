package uk.jbeauty.accountability.receipt;

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
public class ReceiptService {

  private final ReceiptRepository repository;
  private final Clock clock;

  ReceiptService(ReceiptRepository repository, Clock clock) {
    this.repository = repository;
    this.clock = clock;
  }

  Flux<Receipt> findAll() {
    return SecurityUtils.getPrincipal()
        .map(AbstractAuthenticationToken::getName)
        .flatMapMany(repository::findAllByCreatedByOrderByCreatedAtDesc);
  }

  Mono<Receipt> findById(UUID id) {
    return SecurityUtils.getPrincipal()
        .map(AbstractAuthenticationToken::getName)
        .flatMap(username -> repository.findByIdAndCreatedBy(id, username));
  }

  public Flux<Receipt> findAllBetweenDates(LocalDate from, LocalDate to) {
    return SecurityUtils.getPrincipal()
        .map(AbstractAuthenticationToken::getName)
        .flatMapMany(createdBy -> repository.findAllByCreatedByAndDateBetweenOrderByDateAsc(createdBy, from, to));
  }

  @Transactional
  public Mono<Receipt> addReceipt(Receipt receipt) {
    return SecurityUtils.getPrincipal()
        .map(AbstractAuthenticationToken::getName)
        .map(username -> {
          receipt.setCreatedBy(username);
          receipt.setCreatedAt(clock.instant());
          return receipt;
        })
        .flatMap(repository::save);
  }

  @Transactional
  public Mono<Receipt> deleteReceipt(UUID id) {
    return SecurityUtils.getPrincipal()
        .map(AbstractAuthenticationToken::getName)
        .flatMap(username -> repository.deleteByIdAndCreatedBy(id, username));
  }

}
