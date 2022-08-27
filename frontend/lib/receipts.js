import axios from "axios";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export function useReceipts() {
  const { data, error } = useSWR(process.env.NEXT_PUBLIC_RECEIPTS_URL, fetcher);

  return {
    receipts: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function groupByDate(receipts = []) {
  const reducer = (groups, receipt) => {
    const group = receipt.date || "Other";
    const groupIndex = groups.map(({ group }) => group).indexOf(group);

    if (groupIndex === -1) {
      groups.push({ group, receipts: [receipt] });
      return groups;
    }

    groups[groupIndex].receipts.push(receipt);
    return groups;
  };

  const sorter = (a, b) => {
    const dateA = new Date(a.group);
    const dateB = new Date(b.group);
    return dateB.getTime() - dateA.getTime();
  };

  return receipts.reduce(reducer, []).sort(sorter);
}
