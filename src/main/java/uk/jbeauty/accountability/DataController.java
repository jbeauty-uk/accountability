package uk.jbeauty.accountability;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
class DataController {

  @GetMapping("/data")
  Mono<String> getData() {
    return Mono.just("Hello from spring!");
  }

}
