import Footer from "./footer";
import Header from "./header";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
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

export default Layout;
