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
  addReceipt: Receipt;
  deleteReceipt?: Maybe<Receipt>;
};


export type MutationAddReceiptArgs = {
  amount: Scalars['Int'];
  date: Scalars['Date'];
  details?: InputMaybe<Scalars['String']>;
};


export type MutationDeleteReceiptArgs = {
  id?: InputMaybe<Scalars['ID']>;
};

export type Query = {
  __typename?: 'Query';
  /**  Receipts */
  getReceiptById?: Maybe<Receipt>;
  /**  Statements */
  getStatement: Statement;
  getStatementInRange: Statement;
};


export type QueryGetReceiptByIdArgs = {
  id?: InputMaybe<Scalars['ID']>;
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

export type Receipt = {
  __typename?: 'Receipt';
  amount: Scalars['Int'];
  createdAt: Scalars['String'];
  createdBy: Scalars['String'];
  date: Scalars['Date'];
  details?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type Statement = {
  __typename?: 'Statement';
  receipts: Array<Receipt>;
};

export type GetStatementInRangeQueryVariables = Exact<{
  to: Scalars['Date'];
  from: Scalars['Date'];
}>;


export type GetStatementInRangeQuery = { __typename?: 'Query', getStatementInRange: { __typename?: 'Statement', receipts: Array<{ __typename?: 'Receipt', id: string, date: any, amount: number, details?: string | null }> } };


export const GetStatementInRangeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getStatementInRange"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"to"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"from"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getStatementInRange"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"to"},"value":{"kind":"Variable","name":{"kind":"Name","value":"to"}}},{"kind":"Argument","name":{"kind":"Name","value":"from"},"value":{"kind":"Variable","name":{"kind":"Name","value":"from"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"receipts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"details"}}]}}]}}]}}]} as unknown as DocumentNode<GetStatementInRangeQuery, GetStatementInRangeQueryVariables>;