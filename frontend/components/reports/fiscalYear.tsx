import ReactPDF from "@react-pdf/renderer";
import { DateTime } from "luxon";
import { useRef, useState } from "react";
import { generateReport } from "../../lib/reports";
import Button from "../buttons/button";

export interface FiscalYear {
  name: string;
  start: DateTime;
  documentName: string;
}

const YEARS: Array<FiscalYear> = [
  {
    name: "2022-23",
    start: DateTime.fromObject({ day: 6, month: 4, year: 2022 }),
    documentName: "transactions-2022-23",
  },
  {
    name: "2023-24",
    start: DateTime.fromObject({ day: 6, month: 4, year: 2023 }),
    documentName: "transactions-2023-24",
  },
  {
    name: "2024-25",
    start: DateTime.fromObject({ day: 6, month: 4, year: 2024 }),
    documentName: "transactions-2024-25",
  },
];

export function FiscalYears() {
  const downloadLink = useRef<HTMLAnchorElement>(null);
  const [loading, setLoading] = useState(false);

  const generate = async (index: number) => {
    if (!downloadLink || !downloadLink.current) {
      throw new Error("Download link not found...");
    }

    const fiscalYear = YEARS[index];
    setLoading(true);

    const doc = await generateReport(fiscalYear);

    if (!doc) {
      throw new Error("Failed to create PDF document");
    }

    const blob = await ReactPDF.pdf(doc).toBlob();

    downloadLink.current.href = window.URL.createObjectURL(blob);
    downloadLink.current.download = `${fiscalYear.documentName}.pdf`;
    downloadLink.current.click();

    setLoading(false);
  };

  return (
    <>
      {YEARS.map(({ name }, index) => (
        <Button
          key={index}
          disabled={loading}
          label={`Download transactions for ${name}`}
          onClick={() => generate(index)}
        />
      ))}
      <a className="hidden" ref={downloadLink}></a>
    </>
  );
}
