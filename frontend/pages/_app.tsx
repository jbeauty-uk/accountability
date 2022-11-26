import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import "../styles/globals.css";
import axios from "axios";

type Props = {
  session: Session;
} & AppProps;

export default function App({ Component, pageProps, session }: Props) {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
