import { PDFDownloadLink } from "@react-pdf/renderer";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { generateReport } from "../../lib/reports";

export interface FiscalYear {
  name: string;
  start: DateTime;
}

const YEARS: Array<FiscalYear> = [
  {
    name: "2022-23",
    start: DateTime.fromObject({ day: 6, month: 4, year: 2022 }),
  },
];

export function FiscalYears() {
  const [showDownloadLink, setShowDownloadLink] = useState(false);
  const [document, setDocument] = useState<JSX.Element>();

  useEffect(() => {
    document && setShowDownloadLink(true);
  }, [document]);

  const generate = async (index: number) => {
    const doc = await generateReport(YEARS[index]);
    setDocument(doc);
  };

  return (
    <>
      {YEARS.map(({ name }, index) => (
        <button key={index} onClick={() => generate(index)}>
          Generate report for {name}
        </button>
      ))}

      {showDownloadLink && (
        <PDFDownloadLink document={document!}>
          {({ loading }) => (loading ? "Loading document..." : "Download")}
        </PDFDownloadLink>
      )}
    </>
  );
}
