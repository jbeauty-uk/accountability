package uk.jbeauty.accountability.configuration.google;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.security.oauth2.core.OAuth2AuthenticatedPrincipal;
import org.springframework.security.oauth2.server.resource.introspection.BadOpaqueTokenException;
import org.springframework.security.oauth2.server.resource.introspection.OAuth2IntrospectionAuthenticatedPrincipal;
import org.springframework.security.oauth2.server.resource.introspection.ReactiveOpaqueTokenIntrospector;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Component
class GoogleTokenIntrospector implements ReactiveOpaqueTokenIntrospector {

  private final GoogleIdTokenVerifier tokenVerifier;

  public GoogleTokenIntrospector() {
    var transport = new NetHttpTransport();
    var jsonFactory = new GsonFactory();
    this.tokenVerifier = new GoogleIdTokenVerifier(transport, jsonFactory);
  }

  @Override
  public Mono<OAuth2AuthenticatedPrincipal> introspect(String token) {
    try {
      var googleIdToken = tokenVerifier.verify(token);

      var payload = googleIdToken.getPayload();

      Map<String, Object> attributes = Map.of(
          "sub", payload.getSubject(),
          "name", payload.getSubject(),
          "email", payload.getEmail()
      );

      var auth = new OAuth2IntrospectionAuthenticatedPrincipal(attributes, Collections.emptyList());
      return Mono.just(auth);
    } catch (GeneralSecurityException | IOException e) {
      throw new BadOpaqueTokenException(e.getMessage());
    }
  }
}
