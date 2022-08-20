package uk.jbeauty.accountability.treatments;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/treatments")
class TreatmentController {

  private final TreatmentService treatmentService;

  public TreatmentController(TreatmentService treatmentService) {
    this.treatmentService = treatmentService;
  }

  @GetMapping("/category")
  Flux<TreatmentCategory> getAllTreatmentCategories() {
    return treatmentService.getAllTreatmentCategories();
  }

}
