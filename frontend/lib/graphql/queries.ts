import { graphql } from "../graphql/generated";

export const GET_STATEMENT_IN_RANGE = graphql(/* GraphQL */ `
  query getStatementInRange($to: Date!, $from: Date!) {
    getStatementInRange(to: $to, from: $from) {
      transactions {
        id
        date
        amount
        details
      }
    }
  }
`);

export const ADD_TRANSACTION = graphql(/* GraphQL */ `
  mutation addTransaction($date: Date!, $details: String, $amount: Int!) {
    addTransaction(date: $date, details: $details, amount: $amount) {
      id
      date
      amount
      details
    }
  }
`);
