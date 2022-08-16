package uk.jbeauty.accountability.authentication;

import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.Map;

@RestController
@RequestMapping("auth/oauth2")
class Oauth2AuthenticationController {

  @PostMapping("{provider}")
  Mono<String> oauth2Callback(@PathVariable("provider") String provider,
                              @RequestBody Map<String, Object> requestBody) {
    return Mono.just("Callback received in AuthenticationController!");
  }

}
