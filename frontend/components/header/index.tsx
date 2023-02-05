import { AnimatePresence, motion, useCycle } from "framer-motion";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { SITE_BRANDING } from "../../constants";
import Navigation from "./nav";

const Header = () => {
  const [isOpen, cycleOpen] = useCycle(false, true);
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (!ref.current) return;
    setHeight(ref.current.clientHeight);
  }, [ref]);

  const siteBranding = useRef(null);

  return (
    <motion.div
      ref={ref}
      className="bg-neutral-900 text-stone-50"
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      transition={{
        duration: 0.4,
        ease: "anticipate",
      }}
    >
      <div className="flex flex-row items-center justify-between px-6 py-6">
        <motion.div
          ref={siteBranding}
          initial={{ y: -5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Link href="/" className="text-2xl">
            {SITE_BRANDING}
          </Link>
        </motion.div>
        <button
          role="button"
          className="h-10 flex flex-col justify-center items-center aspect-square border-neutral-600 border-2 rounded-md"
          onClick={() => cycleOpen()}
        >
          <motion.div
            variants={{
              open: { rotate: 180 },
              closed: { rotate: 0 },
            }}
            transition={{ duration: 0.2 }}
            style={{ originY: 0.5 }}
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
        </button>
      </div>
      <AnimatePresence>
        {isOpen && <Navigation top={height} cycleOpen={cycleOpen} />}
      </AnimatePresence>
    </motion.div>
  );
};

export default Header;
