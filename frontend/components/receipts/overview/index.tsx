import { gql, useQuery } from "@apollo/client";
import { Receipt } from "../../../graphql/generated/graphql";
import LoadingBar from "../../loading/loadingBar";

const GET_RECEIPTS = gql`
  query {
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
    <>
      {data.getReceipts.map((r: Receipt) => (
        <div key={r.id}>
          <p>{r.id}</p>
          <p>{r.amount}</p>
          <p>{r.createdAt}</p>
        </div>
      ))}
    </>
  );
};

export default ReceiptsOverview;
