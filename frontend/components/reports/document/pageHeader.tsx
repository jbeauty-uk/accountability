import { Text, View } from "@react-pdf/renderer";

interface Props {
  title: string;
}

export default function PageHeader({ title }: Props) {
  return (
    <View>
      <PageTitle title={title} />
    </View>
  );
}

function PageTitle({ title }: { title: string }) {
  return (
    <Text
      style={{
        fontSize: 24,
        paddingBottom: "2cm",
      }}
    >
      {title}
    </Text>
  );
}
