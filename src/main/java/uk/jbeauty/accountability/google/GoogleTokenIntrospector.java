package uk.jbeauty.accountability.google;

import org.springframework.security.oauth2.core.DefaultOAuth2AuthenticatedPrincipal;
import org.springframework.security.oauth2.core.OAuth2AuthenticatedPrincipal;
import org.springframework.security.oauth2.server.resource.introspection.ReactiveOpaqueTokenIntrospector;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@Component
class GoogleTokenIntrospector implements ReactiveOpaqueTokenIntrospector {

  private final GoogleService googleService;

  public GoogleTokenIntrospector(GoogleService googleService) {
    this.googleService = googleService;
  }

  @Override
  public Mono<OAuth2AuthenticatedPrincipal> introspect(String token) {
    googleService.getTokenInfo(token).subscribe();
    return googleService.getUserInfo(token).map(this::fromUserInfo);
  }

  private OAuth2AuthenticatedPrincipal fromUserInfo(UserInfo userInfo) {
    return new DefaultOAuth2AuthenticatedPrincipal(
        Map.of("sub", userInfo.email()),
        List.of()
    );
  }

}
