import { signIn, useSession } from "next-auth/react";
import { Suspense, useEffect } from "react";
import Footer from "./footer";
import Header from "./header";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = (props: LayoutProps) => {
  const { data: session } = useSession({ required: true });

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn(); // Force sign in to hopefully resolve error
    }
  }, [session]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col min-h-screen">
        <Header />
        <Suspense fallback={<p>Loading...</p>}>
          <PageContent {...props} />
        </Suspense>
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
