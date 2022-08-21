package uk.jbeauty.accountability.receipt;

import lombok.AllArgsConstructor;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Optional;

@Repository
@AllArgsConstructor
class ReceiptRepository {

  private final DatabaseClient databaseClient;
  private final ReceiptMapper receiptMapper = new ReceiptMapper();

  Flux<Receipt> findAll(String username) {
    var sql = """
        SELECT *
        FROM receipts r
        INNER JOIN receipt_details rd ON r.id = rd.receipt_id
        WHERE
          r.created_by = :username AND
          rd.deleted_at IS NULL;
        """;
    return databaseClient.sql(sql).bind("username", username).map(receiptMapper).all();
  }

  @Transactional
  Mono<Receipt> createReceipt(String username, Receipt receipt) {
    var sql = """
        INSERT INTO receipt_details (receipt_id, type, date, details, amount)
        VALUES (:receipt_id, :type, :date, :details, :amount);
        """;
    return createReceipt(username).flatMap(r ->
        databaseClient.sql(sql)
            .bind("receipt_id", r.getId())
            .bind("type", receipt.getType())
            .bind("date", receipt.getDate())
            .bind("details", receipt.getDetails())
            .bind("amount", receipt.getAmount())
            .map(receiptMapper)
            .one()
    );
  }

  private Mono<Receipt> createReceipt(String username) {
    var sql = "INSERT INTO receipts (created_by) VALUES (:username) RETURNING *";
    return databaseClient
        .sql(sql)
        .bind("username", username)
        .map(row -> {
          var builder = Receipt.builder();

          Optional.ofNullable(row.get("id", Long.class)).map(builder::setId);
          Optional.ofNullable(row.get("created_by", String.class)).map(builder::setCreatedBy);

          return builder.build();
        })
        .one();
  }

}
