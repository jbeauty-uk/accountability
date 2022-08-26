package uk.jbeauty.accountability.api;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

@Service
public class ApiService {

  private final WebClient webClient;

  public ApiService(WebClient webClient) {
    this.webClient = webClient;
  }

  public <T> Mono<T> get(String uri, Class<T> responseType) {
    return webClient
        .get()
        .uri(uri)
        .retrieve()
        .bodyToMono(responseType)
        .onErrorResume(
            WebClientResponseException.class,
            error -> Mono.error(new ResponseStatusException(error.getStatusCode()))
        );
  }

}
