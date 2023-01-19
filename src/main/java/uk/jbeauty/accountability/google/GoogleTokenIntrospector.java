package uk.jbeauty.accountability.google;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.security.oauth2.core.DefaultOAuth2AuthenticatedPrincipal;
import org.springframework.security.oauth2.core.OAuth2AuthenticatedPrincipal;
import org.springframework.security.oauth2.server.resource.introspection.ReactiveOpaqueTokenIntrospector;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@Component
@ConditionalOnProperty(value = "oauth2.mock", havingValue = "false")
class GoogleTokenIntrospector implements ReactiveOpaqueTokenIntrospector {

  private static final Logger LOGGER = LoggerFactory.getLogger(GoogleTokenIntrospector.class);

  private final GoogleService googleService;

  GoogleTokenIntrospector(GoogleService googleService) {
    this.googleService = googleService;
  }

  @Override
  public Mono<OAuth2AuthenticatedPrincipal> introspect(String token) {
    return googleService.getTokenInfo(token)
        .onErrorResume(error -> {
          LOGGER.info("Token introspection failed: {}", error.getMessage());
          return Mono.error(error);
        })
        .flatMap(i -> googleService.getUserInfo(token))
        .map(this::fromUserInfo);
  }

  private OAuth2AuthenticatedPrincipal fromUserInfo(UserInfo userInfo) {
    return new DefaultOAuth2AuthenticatedPrincipal(
        Map.of("sub", userInfo.email()),
        List.of()
    );
  }

}
