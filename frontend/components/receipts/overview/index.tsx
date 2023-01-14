import { gql, useQuery } from "@apollo/client";
import { Receipt } from "../../../graphql/generated/graphql";
import LoadingBar from "../../loading/loadingBar";
import { DateTime } from "luxon";
import { formatAmount } from "../../../lib/utils";

const GET_RECEIPTS = gql`
  {
    getReceipts {
      id
      amount
      createdAt
    }
  }
`;

const ReceiptsOverview = () => {
  const { loading, error, data } = useQuery(GET_RECEIPTS);

  if (error) return <p>There was a problem loading this page</p>;
  if (loading) return <LoadingBar />;

  return (
    <div className="flex flex-col space-y-2">
      {data.getReceipts.map((r: Receipt) => (
        <div key={r.id} className="p-2 border-2 rounded-md ">
          <p>{formatAmount(r.amount!)}</p>
          <p>Added {DateTime.fromISO(r.createdAt!).toRelative()}</p>
        </div>
      ))}
    </div>
  );
};

export default ReceiptsOverview;
