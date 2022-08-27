package uk.jbeauty.accountability.google;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.core.DefaultOAuth2AuthenticatedPrincipal;
import org.springframework.security.oauth2.core.OAuth2AuthenticatedPrincipal;
import org.springframework.security.oauth2.server.resource.introspection.ReactiveOpaqueTokenIntrospector;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@Component
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@Slf4j
class GoogleTokenIntrospector implements ReactiveOpaqueTokenIntrospector {

  private final GoogleService googleService;

  @Override
  public Mono<OAuth2AuthenticatedPrincipal> introspect(String token) {
    return googleService.getTokenInfo(token)
        .onErrorResume(error -> {
          log.info("Token introspection failed: {}", error.getMessage());
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
