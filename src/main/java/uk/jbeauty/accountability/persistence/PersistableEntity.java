package uk.jbeauty.accountability.persistence;

import java.time.Instant;

public interface PersistableEntity {

  Long getId();

  Instant getCreatedAt();

  Instant getDeletedAt();

}
