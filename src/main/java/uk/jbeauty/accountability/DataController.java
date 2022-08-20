package uk.jbeauty.accountability;

import org.springframework.security.oauth2.server.resource.authentication.BearerTokenAuthentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
class DataController {

  @GetMapping("/data")
  Mono<String> getData(BearerTokenAuthentication authentication) {
    return Mono.just(authentication.getName());
  }

}
