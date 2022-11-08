import { useSession } from "next-auth/react";
import Footer from "./footer";
import Header from "./header";
import axios from "axios";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const session = useSession();

  console.log(session.data?.accessToken);

  axios.defaults.baseURL = process.env.APP_URL;
  axios.defaults.headers.common["Authorization"] = `Bearer `;

  return (
    <div className="flex flex-col overflow-x-hidden">
      <div className="flex flex-col h-screen">
        <Header />
        <div className="relative flex-grow px-6 py-6 flex flex-col space-y-6">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
