package uk.jbeauty.accountability.treatments;

import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;

interface TreatmentCategoryRepository extends ReactiveCrudRepository<TreatmentCategory, Long> {

  @Query("SELECT * FROM treatments.treatment_category tc WHERE tc.deleted_at IS NULL")
  Flux<TreatmentCategory> findAll();

}
