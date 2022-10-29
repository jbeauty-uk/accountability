import Link from "next/link";
import { SITE_BRANDING } from "../../constants";
import Navigation from "./nav";

const Header = () => (
  <div className="bg-neutral-900 text-neutral-50 px-4 py-6">
    <Link href="/" className="text-2xl">
      {SITE_BRANDING}
    </Link>
    <Navigation />
  </div>
);

export default Header;
