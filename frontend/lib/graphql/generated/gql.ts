/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  query getStatementInRange($to: Date!, $from: Date!) {\n    getStatementInRange(to: $to, from: $from) {\n      transactions {\n        id\n        date\n        amount\n        details\n      }\n    }\n  }\n": types.GetStatementInRangeDocument,
    "\n  mutation addTransaction($date: Date!, $details: String, $amount: Int!) {\n    addTransaction(date: $date, details: $details, amount: $amount) {\n      id\n      date\n      amount\n      details\n    }\n  }\n": types.AddTransactionDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getStatementInRange($to: Date!, $from: Date!) {\n    getStatementInRange(to: $to, from: $from) {\n      transactions {\n        id\n        date\n        amount\n        details\n      }\n    }\n  }\n"): (typeof documents)["\n  query getStatementInRange($to: Date!, $from: Date!) {\n    getStatementInRange(to: $to, from: $from) {\n      transactions {\n        id\n        date\n        amount\n        details\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation addTransaction($date: Date!, $details: String, $amount: Int!) {\n    addTransaction(date: $date, details: $details, amount: $amount) {\n      id\n      date\n      amount\n      details\n    }\n  }\n"): (typeof documents)["\n  mutation addTransaction($date: Date!, $details: String, $amount: Int!) {\n    addTransaction(date: $date, details: $details, amount: $amount) {\n      id\n      date\n      amount\n      details\n    }\n  }\n"];

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
**/
export function graphql(source: string): unknown;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;