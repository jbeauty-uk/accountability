import { AnimatePresence } from "framer-motion";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import Footer from "./footer";
import Header from "./header";
import LoadingBar from "./loading/loadingBar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = (props: LayoutProps) => {
  const { status, data: session } = useSession({ required: true });

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn(); // Force sign in to hopefully resolve error
    }
  }, [session]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col min-h-screen">
        <Header />
        <AnimatePresence mode="wait">
          {status === "loading" && <LoadingBar />}
          {status === "authenticated" && <PageContent {...props} />}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
};

const PageContent = ({ children }: LayoutProps) => (
  <div className="px-6 py-6 flex flex-col space-y-6 overflow-x-hidden">
    {children}
  </div>
);

export default Layout;
