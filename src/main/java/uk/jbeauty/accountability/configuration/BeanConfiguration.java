package uk.jbeauty.accountability.configuration;

import graphql.scalars.ExtendedScalars;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.graphql.execution.RuntimeWiringConfigurer;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.Clock;

@Configuration
class BeanConfiguration {

  @Bean
  WebClient webClient() {
    return WebClient.builder().build();
  }

  @Bean
  Clock clock() {
    return Clock.systemUTC();
  }

  @Bean
  RuntimeWiringConfigurer runtimeWiringConfigurer() {
    return wiringBuilder -> wiringBuilder
        .scalar(ExtendedScalars.Date)
        .scalar(ExtendedScalars.GraphQLLong);
  }

  @Profile("prod")
  @Bean("authorizeExchangeSpec")
  ServerHttpSecurity.AuthorizeExchangeSpec authorizeExchangeSpecProd(ServerHttpSecurity http) {
    return http.authorizeExchange()
        .anyExchange().authenticated();
  }

  @Bean("authorizeExchangeSpec")
  @Profile("dev")
  ServerHttpSecurity.AuthorizeExchangeSpec authorizeExchangeSpecDev(ServerHttpSecurity http) {
    return http.authorizeExchange()
        .pathMatchers("/graphiql", "/graphql").permitAll()
        .anyExchange().authenticated();
  }

}
