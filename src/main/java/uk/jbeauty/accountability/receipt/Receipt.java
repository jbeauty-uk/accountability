package uk.jbeauty.accountability.receipt;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import lombok.extern.jackson.Jacksonized;
import uk.jbeauty.accountability.persistence.PersistableEntity;

import java.time.Instant;
import java.time.LocalDate;

@Data
@Jacksonized
@Builder(setterPrefix = "set")
public class Receipt implements PersistableEntity {

  @JsonIgnore
  private Long id;

  private Instant createdAt;

  @JsonIgnore
  private String createdBy;

  @JsonIgnore
  private Instant deletedAt;

  @JsonProperty("id")
  private Long receiptId;

  private String type;

  private LocalDate date;

  private String details;

  private Long amount;
}
