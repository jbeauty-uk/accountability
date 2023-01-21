import { graphql } from "../graphql/generated";

export const GET_STATEMENT_IN_RANGE = graphql(/* GraphQL */ `
  query getStatementInRange($to: Date!, $from: Date!) {
    getStatementInRange(to: $to, from: $from) {
      receipts {
        id
        date
        amount
      }
    }
  }
`);
