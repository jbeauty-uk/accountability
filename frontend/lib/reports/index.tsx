import { Text, View } from "@react-pdf/renderer";
import { groupBy } from "lodash";
import { DateTime } from "luxon";
import React from "react";
import PdfDocument from "../../components/reports/document/document";
import PdfPage from "../../components/reports/document/page";
import PageFooter from "../../components/reports/document/pageFooter";
import PageHeader from "../../components/reports/document/pageHeader";
import { FiscalYear } from "../../components/reports/fiscalYear";
import apolloClient from "../apolloClient";
import { GetTransactionsBetweenQuery } from "../graphql/generated/graphql";
import { GET_TRANSACTIONS_BETWEEN } from "../graphql/queries";
import { formatCurrency } from "../utils";

export async function generateReport(fiscalYear: FiscalYear) {
  const from = fiscalYear.start.startOf("day");
  const to = fiscalYear.start
    .startOf("day")
    .plus({ years: 1 })
    .minus({ days: 1 });

  const { error, data } = await apolloClient.query({
    query: GET_TRANSACTIONS_BETWEEN,
    variables: {
      to: to.toISODate(),
      from: from.toISODate(),
    },
  });

  if (error) throw error;

  if (!data || !data.getTransactionsBetween) {
    return;
  }

  const groupedTransactions = Object.entries(
    groupBy(
      data.getTransactionsBetween,
      ({ date }) => `${DateTime.fromISO(date).toFormat("LLLL yyyy")}`
    )
  );

  const pages = groupedTransactions.map(([title, transactions]) =>
    createPageForMonth(title, transactions)
  );

  return (
    <PdfDocument title={`Transaction report for ${fiscalYear.name}`}>
      <>
        <PdfPage>
          <PageHeader title={`Transaction report for ${fiscalYear.name}`} />
          <View
            style={{
              flexGrow: 1,
              fontSize: 12,
            }}
          >
            <Text>
              {`This report includes transactions between ${from.toLocaleString(
                DateTime.DATE_FULL
              )} and ${to.toLocaleString(DateTime.DATE_FULL)}`}
            </Text>
          </View>

          <PageFooter>
            <Text style={{ fontSize: 12 }}>
              {`This report was generated on ${DateTime.now().toLocaleString(
                DateTime.DATETIME_FULL_WITH_SECONDS
              )}`}
            </Text>
          </PageFooter>
        </PdfPage>
        {pages.map((page, index) => (
          <React.Fragment key={index}>{page}</React.Fragment>
        ))}
        <SummaryPage groupedTransactions={groupedTransactions} />
      </>
    </PdfDocument>
  );
}

interface SummaryPageProps {
  groupedTransactions: Array<
    [string, GetTransactionsBetweenQuery["getTransactionsBetween"]]
  >;
}

const SummaryPage = ({ groupedTransactions }: SummaryPageProps) => {
  return (
    <PdfPage>
      <PageHeader title="Summary" />
      <View
        style={{
          width: "50%",
          fontSize: 12,
        }}
      >
        {groupedTransactions.map(([title, transactions]) => {
          const total = transactions
            .filter(({ amount }) => amount > 0)
            .map(({ amount }) => amount)
            .reduce((sum, amount) => sum + amount, 0);

          return (
            <View
              key={title}
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                paddingVertical: "0.2cm",
              }}
            >
              <Text>{title}</Text>
              <Text>{formatCurrency(total)}</Text>
            </View>
          );
        })}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            paddingVertical: "0.2cm",
            borderTop: "1px solid black",
          }}
        >
          <Text>Total</Text>
          <Text>
            {formatCurrency(
              groupedTransactions
                .flatMap((arr) => arr[1])
                .map(({ amount }) => amount)
                .reduce((sum, amount) => sum + amount, 0)
            )}
          </Text>
        </View>
      </View>
    </PdfPage>
  );
};

interface MonthSummaryProps {
  transactions: GetTransactionsBetweenQuery["getTransactionsBetween"];
}

const MonthSummary = ({ transactions }: MonthSummaryProps) => {
  const income = transactions
    .filter(({ amount }) => amount > 0)
    .map(({ amount }) => amount)
    .reduce((sum, amount) => sum + amount, 0);

  const expenses = transactions
    .filter(({ amount }) => amount < 0)
    .map(({ amount }) => amount * -1)
    .reduce((sum, amount) => sum + amount, 0);

  return (
    <View
      style={{
        paddingBottom: "2cm",
      }}
    >
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text>Total Income</Text>
        <Text>{formatCurrency(income)}</Text>
      </View>
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: "0.2cm",
        }}
      >
        <Text>Total Expenses</Text>
        <Text>{formatCurrency(expenses)}</Text>
      </View>
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: "0.2cm",
          borderTop: "1px solid black",
        }}
      >
        <Text>Total</Text>
        <Text>{formatCurrency(income - expenses)}</Text>
      </View>
    </View>
  );
};

function createPageForMonth(
  title: string,
  transactions: GetTransactionsBetweenQuery["getTransactionsBetween"]
) {
  return (
    <PdfPage>
      <PageHeader title={title} />
      <View
        style={{
          fontSize: 14,
        }}
      >
        <MonthSummary transactions={transactions} />
        {transactions?.map(({ date, amount, details }, index) => (
          <View
            key={index}
            style={{
              paddingTop: "0.2cm",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <View>
              <Text>
                {DateTime.fromISO(date).toLocaleString(DateTime.DATE_SHORT)}
              </Text>
            </View>
            <View
              style={{
                marginLeft: "0.5cm",
                flexGrow: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text>{details}</Text>
              <Text
                style={{
                  color: amount < 0 ? "red" : "black",
                }}
              >
                {formatCurrency(amount)}
              </Text>
            </View>
          </View>
        ))}
        <Text style={{ paddingTop: "1cm" }}>
          End of transactions for {title}
        </Text>
      </View>
    </PdfPage>
  );
}
