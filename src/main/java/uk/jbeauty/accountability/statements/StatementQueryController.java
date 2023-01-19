package uk.jbeauty.accountability.statements;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Mono;

@Controller
class StatementQueryController {

  private final StatementService statementService;

  StatementQueryController(StatementService statementService) {
    this.statementService = statementService;
  }

  @QueryMapping
  Mono<Statement> getStatement(@Argument Integer year,
                               @Argument Integer month,
                               @Argument Integer day) {
    return statementService.getStatement(year, month, day);
  }

}
