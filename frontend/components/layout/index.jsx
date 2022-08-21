import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Navigation from "../navigation";

export default function Layout({ children }) {
  const { status, data: session } = useSession({
    required: true,
  });

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn(); // Force sign in to hopefully resolve error
    }
  }, [session]);

  if (status && session && session.accessToken) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${session.accessToken}`;
  }

  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>{children}</main>
      <footer></footer>
    </>
  );
}
