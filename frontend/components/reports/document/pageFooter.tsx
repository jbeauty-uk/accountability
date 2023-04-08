import { View } from "@react-pdf/renderer";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export default function PageFooter({ children }: Props) {
  return <View>{children}</View>;
}
