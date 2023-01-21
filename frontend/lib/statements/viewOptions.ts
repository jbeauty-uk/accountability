import { DateTime } from "luxon";

const now = DateTime.now();

export const ViewOptions = [
  {
    value: "today",
    label: "Today",
    from: now.toISODate(),
    to: now.plus({ days: 1 }).toISODate(),
  },
  {
    value: "this-week",
    label: "This week",
    from: now.startOf("week").toISODate(),
    to: now.startOf("week").plus({ week: 1 }).toISODate(),
  },
  {
    value: "this-month",
    label: "This month",
    from: now.startOf("month").toISODate(),
    to: now.startOf("week").plus({ month: 1 }).toISODate(),
  },
];
