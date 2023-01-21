package uk.jbeauty.accountability.google;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMapAdapter;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;
import uk.jbeauty.accountability.api.ApiService;
import uk.jbeauty.accountability.exceptions.InvalidAccessTokenException;

import java.util.List;
import java.util.Map;

@Service
class GoogleService {

  private static final Logger LOGGER = LoggerFactory.getLogger(GoogleService.class);

  private final GoogleConfiguration googleConfiguration;
  private final ApiService apiService;

  GoogleService(GoogleConfiguration googleConfiguration, ApiService apiService) {
    this.googleConfiguration = googleConfiguration;
    this.apiService = apiService;
  }

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
      LOGGER.info("Received access token with invalid audience");
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