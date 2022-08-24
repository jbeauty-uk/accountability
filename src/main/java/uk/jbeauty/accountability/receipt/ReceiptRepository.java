package uk.jbeauty.accountability.receipt;

import lombok.AllArgsConstructor;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
@AllArgsConstructor
class ReceiptRepository {

  private final DatabaseClient databaseClient;
  private final ReceiptMapper receiptMapper = new ReceiptMapper();

  Flux<Receipt> findAll(String username) {
    var sql = """
        SELECT *
        FROM receipt_details
        WHERE created_by = :created_by
        AND deleted_at IS NULL
        """;
    return databaseClient.sql(sql)
        .bind("created_by", username)
        .map(receiptMapper)
        .all();
  }

  Mono<Receipt> createReceipt(String username, Receipt receipt) {
    var sql = """
        INSERT INTO receipt_details
        (receipt_id, created_by, type, date, details, amount)
        VALUES (:receipt_id, :created_by, :type, :date, :details, :amount)
        RETURNING *
        """;
    return databaseClient
        .sql("INSERT INTO receipts DEFAULT VALUES RETURNING id")
        .map(row -> row.get("id", Long.class))
        .one()
        .flatMap(id -> databaseClient.sql(sql)
            .bind("receipt_id", id)
            .bind("created_by", username)
            .bind("type", receipt.getType())
            .bind("date", receipt.getDate())
            .bind("details", receipt.getDetails())
            .bind("amount", receipt.getAmount())
            .map(receiptMapper)
            .one()
        );
  }

  Mono<Receipt> updateReceipt(String username, Long receiptId, Receipt receipt) {
    var sql = """
        INSERT INTO receipt_details
        (receipt_id, created_by, type, date, details, amount)
        VALUES (:receipt_id, :created_by, :type, :date, :details, :amount)
        RETURNING *
        """;
    return deleteReceipt(username, receiptId)
        .flatMap(dr -> databaseClient.sql(sql)
            .bind("receipt_id", receiptId)
            .bind("created_by", username)
            .bind("type", receipt.getType())
            .bind("date", receipt.getDate())
            .bind("details", receipt.getDetails())
            .bind("amount", receipt.getAmount())
            .map(receiptMapper)
            .one()
        );
  }

  public Mono<Receipt> deleteReceipt(String username, Long id) {
    var sql = """
        UPDATE receipt_details
        SET deleted_at = now()
        WHERE receipt_id = :id
        AND created_by = :created_by
        AND deleted_at IS NULL
        RETURNING *
        """;
    return databaseClient.sql(sql)
        .bind("id", id)
        .bind("created_by", username)
        .map(receiptMapper)
        .one();
  }

}
