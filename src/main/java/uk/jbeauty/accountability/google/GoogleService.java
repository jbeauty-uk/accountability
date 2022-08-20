package uk.jbeauty.accountability.google;

import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMapAdapter;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;
import uk.jbeauty.accountability.api.ApiService;

import java.util.List;
import java.util.Map;

@Service
class GoogleService {

  private static final String USERINFO_ENDPOINT = "https://www.googleapis.com/oauth2/v1/userinfo";

  private final ApiService apiService;

  public GoogleService(ApiService apiService) {
    this.apiService = apiService;
  }

  public Mono<UserInfo> getUserInfo(String accessToken) {
    Map<String, List<String>> variables = Map.of("access_token", List.of(accessToken));
    var uri = UriComponentsBuilder.fromUriString(USERINFO_ENDPOINT)
        .queryParams(new MultiValueMapAdapter<>(variables))
        .toUriString();

    return apiService.get(uri, UserInfo.class);
  }

}
