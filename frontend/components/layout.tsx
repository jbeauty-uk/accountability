import Footer from "./footer";
import Header from "./header";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <div className="flex flex-col overflow-x-hidden">
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="px-4 py-6">{children}</div>
    </div>
    <Footer />
  </div>
);

export default Layout;
