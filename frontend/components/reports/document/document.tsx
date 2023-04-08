import { Document, Font } from "@react-pdf/renderer";
import { ReactNode } from "react";

interface Props {
  title: string;
  children?: ReactNode;
}

// Font.register({
//   family: "Inter",
//   src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2",
// });

export default function PdfDocument({ title, children }: Props) {
  return (
    <Document
      title={title}
      // style={{
      //   fontFamily: "Inter",
      //   color: "black",
      // }}
    >
      {children}
    </Document>
  );
}
