package uk.jbeauty.accountability.receipt;

import io.r2dbc.spi.Row;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Optional;
import java.util.function.Function;

class ReceiptMapper implements Function<Row, Receipt> {

  @Override
  public Receipt apply(Row row) {
    var builder = Receipt.builder();

    Optional.ofNullable(row.get("id", Long.class)).map(builder::setId);
    Optional.ofNullable(row.get("created_at", Instant.class)).map(builder::setCreatedAt);
    Optional.ofNullable(row.get("deleted_at", Instant.class)).map(builder::setDeletedAt);

    Optional.ofNullable(row.get("receipt_id", Long.class)).map(builder::setReceiptId);
    Optional.ofNullable(row.get("created_by", String.class)).map(builder::setCreatedBy);
    Optional.ofNullable(row.get("type", String.class)).map(builder::setType);
    Optional.ofNullable(row.get("date", LocalDate.class)).map(builder::setDate);
    Optional.ofNullable(row.get("details", String.class)).map(builder::setDetails);
    Optional.ofNullable(row.get("amount", Long.class)).map(builder::setAmount);

    return builder.build();
  }
}
