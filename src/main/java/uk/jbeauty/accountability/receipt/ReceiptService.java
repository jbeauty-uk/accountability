package uk.jbeauty.accountability.receipt;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@AllArgsConstructor
public class ReceiptService {

  private final ReceiptRepository repository;

  public Flux<Receipt> findAll(String username) {
    return repository.findAll(username);
  }

  public Mono<Receipt> createReceipt(String username, Receipt receipt) {
    return repository.createReceipt(username, receipt);
  }

  public Mono<Receipt> updateReceipt(String username, Long receiptId, Receipt receipt) {
    return repository.updateReceipt(username, receiptId, receipt);
  }

  public Mono<Receipt> deleteReceipt(String username, Long receiptId) {
    return repository.deleteReceipt(username, receiptId);
  }

}
