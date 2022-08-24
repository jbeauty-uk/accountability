import {SessionProvider} from "next-auth/react";
import Layout from "../components/layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider
      session={session}
      refetchInterval={5}
      refetchOnWindowFocus={false}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
