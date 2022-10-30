import Link from "next/link";

type Route = {
  displayText: string;
  href: string;
  onClick?: () => void;
};

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

type Props = {
  cycleOpen: () => void;
};

const Navigation = ({ cycleOpen }: Props) => (
  <nav className="flex flex-col text-xl items-end w-full h-full relative">
    {routes.map(({ displayText, href }) => (
      <NavLink
        key={href}
        href={href}
        displayText={displayText}
        onClick={cycleOpen}
      />
    ))}
  </nav>
);

const NavLink = ({ displayText, href, onClick }: Route) => (
  <Link href={href} onClick={onClick}>
    {displayText}
  </Link>
);

export default Navigation;
