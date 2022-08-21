import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Hamburger from "../layout/hamburger";

const routes = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Receipts",
    href: "/receipts",
  },
];

export default function Navigation() {
  const { data: session } = useSession();
  const { pathname } = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const closeNavigation = () => setIsOpen(false);

  if (session) {
    return (
      <NavContainer isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="flex flex-col">
          {session.user && (
            <>
              <div className="flex flex-col py-4 space-y-2 text-lg">
                {routes.map(({ name, href }) => (
                  <Link href={href} key={href} passHref>
                    <a
                      onClick={closeNavigation}
                      className={`${
                        pathname == href
                          ? "text-sky-400 underline underline-offset-2"
                          : ""
                      }`}
                    >
                      {name}
                    </a>
                  </Link>
                ))}
              </div>
              <div className="flex justify-between text-sm">
                <p>Signed in as {session.user.name}</p>
                <button onClick={() => signOut({ callbackUrl: "/" })}>
                  Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </NavContainer>
    );
  }

  return (
    <NavContainer>
      <button onClick={signIn}>Sign in</button>
    </NavContainer>
  );
}

function NavContainer({ children, isOpen, setIsOpen }) {
  return (
    <nav className="flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl">Accountability</h2>
        <Hamburger isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
      </div>
      {isOpen && children}
    </nav>
  );
}
