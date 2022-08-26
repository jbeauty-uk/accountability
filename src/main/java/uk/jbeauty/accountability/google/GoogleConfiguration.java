package uk.jbeauty.accountability.google;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("google")
record GoogleConfiguration(
    String clientId,
    Endpoints endpoints
) {

  @ConfigurationProperties("endpoints")
  record Endpoints(
      String userInfo,
      String tokenInfo
  ) {}

}
