package uk.jbeauty.accountability.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.config.CorsRegistry;
import org.springframework.web.reactive.config.WebFluxConfigurer;

@Configuration
class BeanConfiguration implements WebFluxConfigurer {

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
        .allowedOrigins("https://accountability.jbueaty.uk")
        .allowedMethods("GET", "POST", "PUT")
        .maxAge(3600);
  }
}
