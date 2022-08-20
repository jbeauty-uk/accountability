package uk.jbeauty.accountability;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class AccountabilityApplication {

  public static void main(String[] args) {
    SpringApplication.run(AccountabilityApplication.class, args);
  }

}
