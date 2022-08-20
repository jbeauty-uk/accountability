import {signIn, signOut, useSession} from "next-auth/react";

export default function Navigation() {
  const { data: session } = useSession();

  if (session) {
    return (
      <nav>
        {session.user && <p>Signed in as {session.user.name}</p>}
        <button onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>
      </nav>
    );
  }

  return (
    <nav>
      <button onClick={signIn}>Sign in</button>
    </nav>
  );
}
