package uk.jbeauty.accountability.treatments;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Table("treatments.treatment_category")
public record TreatmentCategory(
    @Id Long id,
    String category,
    @JsonIgnore LocalDateTime createdAt,
    @JsonIgnore LocalDateTime deletedAt
) {
}
