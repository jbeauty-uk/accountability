/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** An RFC-3339 compliant Full Date Scalar */
  Date: any;
  /** A 64-bit signed integer */
  Long: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  addTransaction: Transaction;
  deleteTransaction: Transaction;
  updateTransaction: Transaction;
};


export type MutationAddTransactionArgs = {
  amount: Scalars['Int'];
  date: Scalars['Date'];
  details?: InputMaybe<Scalars['String']>;
};


export type MutationDeleteTransactionArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateTransactionArgs = {
  amount: Scalars['Int'];
  date: Scalars['Date'];
  details?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  /**  Statements */
  getStatement: Statement;
  getStatementInRange: Statement;
  /**  Analytics */
  getTransactionAnalyticsInRange: Array<TransactionAnalytics>;
  /**  Transaction */
  getTransactionById?: Maybe<Transaction>;
};


export type QueryGetStatementArgs = {
  day?: InputMaybe<Scalars['Int']>;
  month?: InputMaybe<Scalars['Int']>;
  year: Scalars['Int'];
};


export type QueryGetStatementInRangeArgs = {
  from: Scalars['Date'];
  to: Scalars['Date'];
};


export type QueryGetTransactionAnalyticsInRangeArgs = {
  from: Scalars['Date'];
  to: Scalars['Date'];
};


export type QueryGetTransactionByIdArgs = {
  id?: InputMaybe<Scalars['ID']>;
};

export type Statement = {
  __typename?: 'Statement';
  transactions: Array<Transaction>;
};

export type Transaction = {
  __typename?: 'Transaction';
  amount: Scalars['Int'];
  createdAt: Scalars['String'];
  createdBy: Scalars['String'];
  date: Scalars['Date'];
  details?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type TransactionAnalytics = {
  __typename?: 'TransactionAnalytics';
  average: Scalars['Int'];
  count: Scalars['Int'];
  detail: Scalars['String'];
  max: Scalars['Int'];
  min: Scalars['Int'];
};

export type GetStatementInRangeQueryVariables = Exact<{
  to: Scalars['Date'];
  from: Scalars['Date'];
}>;


export type GetStatementInRangeQuery = { __typename?: 'Query', getStatementInRange: { __typename?: 'Statement', transactions: Array<{ __typename?: 'Transaction', id: string, date: any, amount: number, details?: string | null }> } };

export type GetTransactionAnalyticsInRangeQueryVariables = Exact<{
  to: Scalars['Date'];
  from: Scalars['Date'];
}>;


export type GetTransactionAnalyticsInRangeQuery = { __typename?: 'Query', getTransactionAnalyticsInRange: Array<{ __typename?: 'TransactionAnalytics', detail: string, count: number, min: number, average: number, max: number }> };

export type AddTransactionMutationVariables = Exact<{
  date: Scalars['Date'];
  details?: InputMaybe<Scalars['String']>;
  amount: Scalars['Int'];
}>;


export type AddTransactionMutation = { __typename?: 'Mutation', addTransaction: { __typename?: 'Transaction', id: string, date: any, amount: number, details?: string | null } };

export type UpdateTransactionMutationVariables = Exact<{
  id: Scalars['ID'];
  details?: InputMaybe<Scalars['String']>;
  date: Scalars['Date'];
  amount: Scalars['Int'];
}>;


export type UpdateTransactionMutation = { __typename?: 'Mutation', updateTransaction: { __typename?: 'Transaction', id: string, date: any, amount: number, details?: string | null } };


export const GetStatementInRangeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getStatementInRange"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"to"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"from"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getStatementInRange"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"to"},"value":{"kind":"Variable","name":{"kind":"Name","value":"to"}}},{"kind":"Argument","name":{"kind":"Name","value":"from"},"value":{"kind":"Variable","name":{"kind":"Name","value":"from"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"details"}}]}}]}}]}}]} as unknown as DocumentNode<GetStatementInRangeQuery, GetStatementInRangeQueryVariables>;
export const GetTransactionAnalyticsInRangeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTransactionAnalyticsInRange"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"to"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"from"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTransactionAnalyticsInRange"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"to"},"value":{"kind":"Variable","name":{"kind":"Name","value":"to"}}},{"kind":"Argument","name":{"kind":"Name","value":"from"},"value":{"kind":"Variable","name":{"kind":"Name","value":"from"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"detail"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"min"}},{"kind":"Field","name":{"kind":"Name","value":"average"}},{"kind":"Field","name":{"kind":"Name","value":"max"}}]}}]}}]} as unknown as DocumentNode<GetTransactionAnalyticsInRangeQuery, GetTransactionAnalyticsInRangeQueryVariables>;
export const AddTransactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addTransaction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"details"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"amount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addTransaction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}},{"kind":"Argument","name":{"kind":"Name","value":"details"},"value":{"kind":"Variable","name":{"kind":"Name","value":"details"}}},{"kind":"Argument","name":{"kind":"Name","value":"amount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"amount"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"details"}}]}}]}}]} as unknown as DocumentNode<AddTransactionMutation, AddTransactionMutationVariables>;
export const UpdateTransactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateTransaction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"details"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"amount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTransaction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"details"},"value":{"kind":"Variable","name":{"kind":"Name","value":"details"}}},{"kind":"Argument","name":{"kind":"Name","value":"amount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"amount"}}},{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"details"}}]}}]}}]} as unknown as DocumentNode<UpdateTransactionMutation, UpdateTransactionMutationVariables>;