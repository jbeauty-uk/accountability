import Navigation from "./navigation/Navigation";

export default function Layout({ children }) {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>{children}</main>
      <footer></footer>
    </>
  );
}
