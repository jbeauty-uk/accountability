package uk.jbeauty.accountability.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
class BeanConfiguration {

  @Bean
  WebClient webClient() {
    return WebClient.builder().build();
  }

}
