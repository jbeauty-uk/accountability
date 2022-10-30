import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type SummarySelector = {
  label: string;
};

const summaryTypes: SummarySelector[] = [
  {
    label: "Week",
  },
  {
    label: "Month",
  },
  {
    label: "Year",
  },
  {
    label: "Custom",
  },
];

const SummaryContainer = () => {
  const [summaryIndex, setSummaryIndex] = useState(0);
  const [selectedSummary, setSelectedSummary] = useState(
    summaryTypes[summaryIndex]
  );

  useEffect(() => {
    setSelectedSummary(summaryTypes[summaryIndex]);
  }, [summaryIndex]);

  return (
    <div className="flex flex-col my-4 space-y-3">
      <h2>Showing summary for selected period</h2>
      <ul className="grid grid-cols-4 rounded-full text-center">
        {summaryTypes.map((summary, index) => {
          const isSelected = index === summaryIndex;
          return (
            <li
              key={summary.label}
              className={`p-2 first:rounded-tl-md last:rounded-tr-md ${
                isSelected ? "bg-purple-200 font-semibold" : "bg-neutral-200"
              }`}
              onClick={() => setSummaryIndex(index)}
            >
              <p>{summary.label}</p>
              {isSelected && <Underline />}
            </li>
          );
        })}
      </ul>
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedSummary ? selectedSummary.label : "empty"}
          initial={{ y: -50, scale: 0.9, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: 50, scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2, ease: "anticipate" }}
        >
          <div className="aspect-square w-full bg-neutral-200 p-4 rounded-b-md">
            {selectedSummary ? selectedSummary.label : "😋"}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const Underline = () => (
  <motion.div
    transition={{
      duration: 0.5,
      ease: "anticipate",
    }}
    layoutId="underline"
    className="w-full border-b-2 border-neutral-900"
  ></motion.div>
);

export default SummaryContainer;
