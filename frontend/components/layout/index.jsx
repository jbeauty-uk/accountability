import axios from "axios";
import {useSession} from "next-auth/react";
import {useEffect} from "react";
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
      <div className="min-h-screen flex flex-col">
        <header className="container flex flex-col space-y-2 border-b border-black">
          <Navigation />
        </header>
        <main className="container flex-grow">{children}</main>
      </div>
      <footer className="container border-t border-black">
        <p>Accountability</p>
      </footer>
    </>
  );
}
