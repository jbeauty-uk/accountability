package uk.jbeauty.accountability.utils;

import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.oauth2.server.resource.authentication.BearerTokenAuthentication;
import reactor.core.publisher.Mono;

public class SecurityUtils {

  private SecurityUtils() {}

  public static Mono<BearerTokenAuthentication> getPrincipal() {
    return ReactiveSecurityContextHolder
        .getContext()
        .map(SecurityContext::getAuthentication)
        .cast(BearerTokenAuthentication.class);
  }

}
