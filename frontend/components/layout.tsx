import Header from "./header";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <div>
    <Header />
    {children}
  </div>
);

export default Layout;
