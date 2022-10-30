import { motion, Variants } from "framer-motion";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

const navigationVariants: Variants = {
  open: { height: "auto" },
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
    displayText: "Receipts",
    href: "/receipts",
  },
];

const routeVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

type Props = {
  cycleOpen: () => void;
};

const Navigation = ({ cycleOpen }: Props) => {
  const { route } = useRouter();
  const { status, data } = useSession();

  const name = data?.user?.name;

  console.log(name);

  return (
    <motion.ul
      variants={navigationVariants}
      exit={"closed"}
      initial={"closed"}
      animate={"open"}
    >
      <div className="flex flex-col items-end space-y-6 text-xl px-4 pb-6">
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
        {status === "authenticated" ? (
          <div className="p-4">
            <p>{`Signed in as ${name?.split(" ")[0]}. Sign out`}</p>
            <button onClick={() => signOut()}></button>
          </div>
        ) : (
          <button onClick={() => signIn()}>Sign in</button>
        )}
      </motion.div>
    </motion.ul>
  );
};

export default Navigation;
