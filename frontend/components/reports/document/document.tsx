import { Document } from "@react-pdf/renderer";
import { ReactNode } from "react";

interface Props {
  title: string;
  children?: ReactNode;
}

export default function PdfDocument({ title, children }: Props) {
  return <Document title={title}>{children}</Document>;
}
