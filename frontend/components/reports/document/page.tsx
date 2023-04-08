import { Page } from "@react-pdf/renderer";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export default function PdfPage({ children }: Props) {
  return (
    <Page
      size="A4"
      style={{
        padding: "4cm 2cm 2cm 2cm",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </Page>
  );
}
