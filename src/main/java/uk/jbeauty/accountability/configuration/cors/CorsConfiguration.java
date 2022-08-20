package uk.jbeauty.accountability.configuration.cors;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@EnableWebFluxSecurity
class CorsConfiguration {

  private final CorsConfigurationProperties configurationProperties;

  public CorsConfiguration(CorsConfigurationProperties configurationProperties) {
    this.configurationProperties = configurationProperties;
  }

  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    var configuration = new org.springframework.web.cors.CorsConfiguration();
    configuration.setAllowedOrigins(configurationProperties.allowedOrigins());
    configuration.setAllowedMethods(configurationProperties.allowedMethods());
    configuration.setMaxAge(configurationProperties.maxAge());

    var source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration(configurationProperties.path(), configuration);

    return source;
  }

}
