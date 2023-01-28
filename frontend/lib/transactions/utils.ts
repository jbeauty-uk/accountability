import { DateTime, Interval } from "luxon";
import { DateOption } from "../../components/inputs/Select";
import { useTransactionRange } from "./hooks";

export function useAvailableMonths() {
  const { loading, data } = useTransactionRange();
  const format = "LLLL yyyy";

  if (!data) {
    return { loading, availableMonths: [] };
  }

  const {
    getTransactionRange: { from, to },
  } = data;

  const availableMonths: DateOption[] = Interval.fromDateTimes(
    DateTime.fromISO(from).startOf("month"),
    DateTime.fromISO(to).startOf("month")
  )
    .splitBy({ month: 1 })
    .map((i) => {
      const label = i.start.toFormat(format);
      const option = {
        label,
        value: label.replace(" ", "-").toLocaleLowerCase(),
        from: i.start.toISODate(),
        to: i.start.plus({ month: 1 }).toISODate(),
      };
      return option;
    })
    .reverse();

  return { loading, availableMonths };
}
