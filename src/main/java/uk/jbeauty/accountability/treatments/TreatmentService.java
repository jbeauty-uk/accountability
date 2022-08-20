package uk.jbeauty.accountability.treatments;

import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public class TreatmentService {

  private final TreatmentCategoryRepository treatmentCategoryRepository;

  public TreatmentService(TreatmentCategoryRepository treatmentCategoryRepository) {
    this.treatmentCategoryRepository = treatmentCategoryRepository;
  }

  public Flux<TreatmentCategory> getAllTreatmentCategories() {
    return treatmentCategoryRepository.findAll();
  }

}
