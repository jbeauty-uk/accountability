import Header from "./header";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <div className="flex flex-col h-screen">
    <Header />
    <div className="px-4 py-6">{children}</div>
  </div>
);

export default Layout;
