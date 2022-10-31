import { COPYRIGHT_YEAR, SITE_BRANDING } from "../../constants";

const Footer = () => (
  <footer className="bg-neutral-900 text-stone-50 flex flex-col space-y-6 px-4 py-6">
    <div className="flex flex-col space-y-1 items-start justify-between py-8">
      <p className="text-xl font-semibold">{SITE_BRANDING}</p>
      <div className="flex flex-row text-sm">
        <p>&copy;</p>
        <p>{COPYRIGHT_YEAR}</p>
      </div>
    </div>
    <div className="flex flex-row space-x-1 text-sm pb-8">
      <p>Maintained and built by</p>
      <a
        href="https://dgrinbergs.com"
        target="_blank"
        className="underline underline-offset-2"
      >
        DGrinbergs.com
      </a>
    </div>
  </footer>
);

export default Footer;
