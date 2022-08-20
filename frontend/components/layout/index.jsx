import axios from "axios";
import {useSession} from "next-auth/react";
import Navigation from "../navigation";

export default function Layout({ children }) {
  const { status, data } = useSession({
    required: true,
  });

  if (status && data && data.accessToken) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${data.accessToken}`;
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
