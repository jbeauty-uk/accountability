import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { status, data } = useSession({
    required: true,
    onUnauthenticated: signIn,
  });

  const sendRequest = async () => {
    var response = await axios.get("http://localhost:8080/data", {
      headers: {
        Authorization: `Bearer ${data.accessToken}`,
      },
    });
    console.log(response);
  };

  if (status != "authenticated") {
    return <p>You must sign in to see this page</p>;
  }

  if (status == "loading") {
    return <p>Loading</p>;
  }

  return (
    <>
      <p>Authenticated</p>
      <button onClick={sendRequest}>Send Request</button>
    </>
  );
}
