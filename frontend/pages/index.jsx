import { PageHeading } from "../components/headings";
import Summary from "../components/summary";

export default function Home() {
  return (
    <div className="flex flex-col space-y-4">
      <PageHeading heading="Home" />
      <Summary />
    </div>
  );
}
