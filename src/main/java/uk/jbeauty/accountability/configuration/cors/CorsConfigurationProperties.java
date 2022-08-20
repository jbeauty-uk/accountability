package uk.jbeauty.accountability.configuration.cors;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.List;

@ConfigurationProperties("spring.security.cors")
record CorsConfigurationProperties(
    String path,
    Long maxAge,
    List<String> allowedOrigins,
    List<String> allowedMethods
) {
}
