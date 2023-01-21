package uk.jbeauty.accountability.configuration;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.security.oauth2.core.DefaultOAuth2AuthenticatedPrincipal;
import org.springframework.security.oauth2.core.OAuth2AuthenticatedPrincipal;
import org.springframework.security.oauth2.server.resource.introspection.ReactiveOpaqueTokenIntrospector;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@Component
@ConditionalOnProperty(value = "oauth2.mock", havingValue = "true")
class MockTokenIntrospector implements ReactiveOpaqueTokenIntrospector {

  @Override
  public Mono<OAuth2AuthenticatedPrincipal> introspect(String token) {
    return Mono.just(getMockAuthenticationPrincipal());
  }

  private OAuth2AuthenticatedPrincipal getMockAuthenticationPrincipal() {
    return new DefaultOAuth2AuthenticatedPrincipal(
        Map.of("sub", "user@localhost"),
        List.of()
    );
  }

}
