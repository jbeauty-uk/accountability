import { AnimatePresence, motion, useCycle, Variants } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { SITE_BRANDING } from "../../constants";

type Route = {
  displayText: string;
  href: string;
  onClick?: () => void;
};

const duration = 0.2;

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

const navigationVariants: Variants = {
  open: { height: "auto" },
  closed: { height: 0 },
};

const routeVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: -20, transition: { duration } },
};

const Header = () => {
  const { route } = useRouter();

  const [isOpen, cycleOpen] = useCycle(false, true);

  return (
    <motion.div
      className="bg-neutral-900 text-stone-50 relative"
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      transition={{
        duration: 0.4,
        ease: "anticipate",
      }}
    >
      <div className="flex flex-row items-center justify-between px-4 py-6">
        <Link href="/" className="text-2xl">
          {SITE_BRANDING}
        </Link>
        <motion.div
          variants={{
            open: { rotate: 180 },
            closed: { rotate: 0 },
          }}
          transition={{ duration }}
          style={{ originY: 0.5 }}
          onClick={() => cycleOpen()}
        >
          <svg
            width="15"
            height="15"
            className="fill-neutral-50"
            viewBox="0 0 20 20"
          >
            <path d="M0 7 L 20 7 L 10 16" />
          </svg>
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
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
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Header;
