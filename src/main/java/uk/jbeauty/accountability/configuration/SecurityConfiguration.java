package uk.jbeauty.accountability.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@EnableWebFluxSecurity
class SecurityConfiguration {

  @Bean
  SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
    return http
        .authorizeExchange()
        .pathMatchers("/auth/**").permitAll()
        .anyExchange().authenticated()
        .and()
        .csrf().disable()
        .oauth2ResourceServer((resourceServer) -> resourceServer
            .jwt(withDefaults())
        )
        .build();
  }

}
