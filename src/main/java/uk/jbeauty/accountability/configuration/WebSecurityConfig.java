package uk.jbeauty.accountability.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@EnableWebFluxSecurity
class WebSecurityConfig {

  private final CorsConfigurationProperties configurationProperties;

  WebSecurityConfig(CorsConfigurationProperties configurationProperties) {
    this.configurationProperties = configurationProperties;
  }

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

  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    var configuration = new org.springframework.web.cors.CorsConfiguration();
    configuration.setAllowedOrigins(configurationProperties.allowedOrigins());
    configuration.setAllowedMethods(configurationProperties.allowedMethods());
    configuration.setAllowedHeaders(configurationProperties.allowedHeaders());
    configuration.setMaxAge(configurationProperties.maxAge());
    configuration.setAllowCredentials(true);

    var source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration(configurationProperties.path(), configuration);

    return source;
  }

}
