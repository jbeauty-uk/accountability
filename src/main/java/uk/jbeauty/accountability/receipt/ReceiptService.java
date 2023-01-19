package uk.jbeauty.accountability.receipt;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.oauth2.server.resource.authentication.BearerTokenAuthentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Clock;
import java.util.UUID;

@Service
public class ReceiptService {

  private final ReceiptRepository repository;
  private final Clock clock;

  ReceiptService(ReceiptRepository repository, Clock clock) {
    this.repository = repository;
    this.clock = clock;
  }

  public Flux<Receipt> findAll() {
    return getPrincipal()
        .map(AbstractAuthenticationToken::getName)
        .flatMapMany(repository::findAllByCreatedByOrderByCreatedAtDesc);
  }

  public Mono<Receipt> findById(UUID id) {
    return getPrincipal()
        .map(AbstractAuthenticationToken::getName)
        .flatMap(username -> repository.findByIdAndCreatedBy(id, username));
  }

  @Transactional
  public Mono<Receipt> addReceipt(Receipt receipt) {
    return getPrincipal()
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
    return getPrincipal()
        .map(AbstractAuthenticationToken::getName)
        .flatMap(username -> repository.deleteByIdAndCreatedBy(id, username));
  }

  private Mono<BearerTokenAuthentication> getPrincipal() {
    return ReactiveSecurityContextHolder
        .getContext()
        .map(SecurityContext::getAuthentication)
        .cast(BearerTokenAuthentication.class);
  }

}
