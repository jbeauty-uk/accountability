import { useSession, signIn } from "next-auth/react";

export default function DashboardPage() {
  const { status } = useSession({
    required: true,
    onUnauthenticated: () => signIn(),
  });

  if (status === "loading") {
    return "Loading or not authenticated...";
  }

  return "User is logged in";
}
