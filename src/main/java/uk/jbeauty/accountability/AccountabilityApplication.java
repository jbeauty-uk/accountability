package uk.jbeauty.accountability;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.data.r2dbc.config.EnableR2dbcAuditing;
import org.springframework.data.r2dbc.repository.config.EnableR2dbcRepositories;

@SpringBootApplication
@ConfigurationPropertiesScan
@EnableR2dbcRepositories
@EnableR2dbcAuditing
public class AccountabilityApplication {

  public static void main(String[] args) {
    SpringApplication.run(AccountabilityApplication.class, args);
  }

}
