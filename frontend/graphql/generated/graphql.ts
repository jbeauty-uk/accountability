/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
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
  getReceiptById?: Maybe<Receipt>;
  getReceipts?: Maybe<Array<Maybe<Receipt>>>;
};


export type QueryGetReceiptByIdArgs = {
  id?: InputMaybe<Scalars['ID']>;
};

export type Receipt = {
  __typename?: 'Receipt';
  amount?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['Date']>;
  details?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
};

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
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
  getReceiptById?: Maybe<Receipt>;
  getReceipts?: Maybe<Array<Maybe<Receipt>>>;
};


export type QueryGetReceiptByIdArgs = {
  id?: InputMaybe<Scalars['ID']>;
};

export type Receipt = {
  __typename?: 'Receipt';
  amount?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['Date']>;
  details?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Long: ResolverTypeWrapper<Scalars['Long']>;
  Mutation: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Query: ResolverTypeWrapper<{}>;
  Receipt: ResolverTypeWrapper<Receipt>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Date: Scalars['Date'];
  Long: Scalars['Long'];
  Mutation: {};
  Int: Scalars['Int'];
  String: Scalars['String'];
  ID: Scalars['ID'];
  Query: {};
  Receipt: Receipt;
  Boolean: Scalars['Boolean'];
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface LongScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Long'], any> {
  name: 'Long';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addReceipt?: Resolver<ResolversTypes['Receipt'], ParentType, ContextType, RequireFields<MutationAddReceiptArgs, 'amount' | 'date'>>;
  deleteReceipt?: Resolver<Maybe<ResolversTypes['Receipt']>, ParentType, ContextType, Partial<MutationDeleteReceiptArgs>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getReceiptById?: Resolver<Maybe<ResolversTypes['Receipt']>, ParentType, ContextType, Partial<QueryGetReceiptByIdArgs>>;
  getReceipts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Receipt']>>>, ParentType, ContextType>;
};

export type ReceiptResolvers<ContextType = any, ParentType extends ResolversParentTypes['Receipt'] = ResolversParentTypes['Receipt']> = {
  amount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  details?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Date?: GraphQLScalarType;
  Long?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Receipt?: ReceiptResolvers<ContextType>;
};

