package uk.jbeauty.accountability.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class InvalidAccessTokenException extends RuntimeException {

  public InvalidAccessTokenException(String message) {
    super(message);
  }

}
