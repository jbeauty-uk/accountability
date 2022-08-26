package uk.jbeauty.accountability.google;

import java.time.Instant;

record TokenInfo(
    String azp,
    String aud,
    String scope,
    Instant exp, // datetime to nearest second
    Long expiresIn, // duration in seconds
    String email,
    String emailVerified,
    String accessType
) {
}
