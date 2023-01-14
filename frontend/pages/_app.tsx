import { ApolloProvider } from "@apollo/client";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import apolloClient from "../lib/apolloClient";
import "../styles/globals.css";

type Props = {
  session: Session;
} & AppProps;

export default function App({ Component, pageProps, session }: Props) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </SessionProvider>
  );
}
