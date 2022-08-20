package uk.jbeauty.accountability.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

@EnableWebFluxSecurity
class WebSecurityConfig {

  @Bean
  SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
    return http
        .authorizeExchange()
        .anyExchange().authenticated()
        .and()
        .csrf().disable()
        .oauth2ResourceServer(ServerHttpSecurity.OAuth2ResourceServerSpec::opaqueToken)
        .build();
  }

}
