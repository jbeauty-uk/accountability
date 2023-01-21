import { motion, Variants } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

const navigationVariants: Variants = {
  open: { height: "auto", transition: { staggerChildren: 0.075 } },
  closed: { height: 0 },
};

type Route = {
  displayText: string;
  href: string;
  onClick?: () => void;
};

const routes: Route[] = [
  {
    displayText: "Home",
    href: "/",
  },
  {
    displayText: "Transactions",
    href: "/transactions",
  },
  {
    displayText: "Statements",
    href: "/statements",
  },
];

const routeVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.2 },
  },
};

type Props = {
  top: number;
  cycleOpen: () => void;
};

const Navigation = ({ top, cycleOpen }: Props) => {
  const { route } = useRouter();
  const { status, data } = useSession();

  const name = data?.user?.name;

  return (
    <motion.ul
      variants={navigationVariants}
      exit={"closed"}
      initial={"closed"}
      animate={"open"}
      className="bg-neutral-900 absolute left-0 right-0"
      style={{ top }}
    >
      <div className="flex flex-col items-end space-y-6 text-xl px-6 py-12">
        {routes.map(({ displayText, href }) => (
          <motion.li key={href} variants={routeVariants}>
            <Link
              href={href}
              onClick={cycleOpen}
              className={
                route === href
                  ? "underline underline-offset-4 font-semibold"
                  : "no-underline"
              }
            >
              {displayText}
            </Link>
          </motion.li>
        ))}
      </div>
      <motion.div
        variants={routeVariants}
        className="flex flex-col items-center"
      >
        <div className="flex flex-row p-4 space-x-2">
          {status === "authenticated" ? (
            <>
              <p>{`Signed in as ${name?.split(" ")[0]}.`}</p>
              <button onClick={() => signOut()}>Sign out</button>
            </>
          ) : (
            <button onClick={() => signIn()}>Sign in</button>
          )}
        </div>
      </motion.div>
    </motion.ul>
  );
};

export default Navigation;
