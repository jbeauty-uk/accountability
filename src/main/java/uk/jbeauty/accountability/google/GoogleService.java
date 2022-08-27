package uk.jbeauty.accountability.google;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMapAdapter;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;
import uk.jbeauty.accountability.api.ApiService;
import uk.jbeauty.accountability.exceptions.InvalidAccessTokenException;

import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@Slf4j
class GoogleService {

  private final GoogleConfiguration googleConfiguration;
  private final ApiService apiService;

  Mono<UserInfo> getUserInfo(String accessToken) {
    return getWithParams(
        googleConfiguration.endpoints().userInfo(),
        Map.of("access_token", List.of(accessToken)),
        UserInfo.class
    );
  }

  Mono<TokenInfo> getTokenInfo(String accessToken) {
    return getWithParams(
        googleConfiguration.endpoints().tokenInfo(),
        Map.of("access_token", List.of(accessToken)),
        TokenInfo.class
    ).flatMap(tokenInfo -> isTokenAudienceValid(tokenInfo.aud())
        ? Mono.just(tokenInfo)
        : Mono.error(new InvalidAccessTokenException("Invalid subject in access token"))
    );
  }

  private boolean isTokenAudienceValid(String audience) {
    var isValid = audience.equals(googleConfiguration.clientId());
    if (!isValid) {
      log.info("Received access token with invalid audience");
    }
    return isValid;
  }

  private <T> Mono<T> getWithParams(String endpoint, Map<String, List<String>> params, Class<T> responseType) {
    var uri = UriComponentsBuilder.fromUriString(endpoint)
        .queryParams(new MultiValueMapAdapter<>(params))
        .toUriString();

    return apiService.get(uri, responseType);
  }

}