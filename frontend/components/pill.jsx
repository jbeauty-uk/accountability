export default function Pill({ text, colour }) {
  return (
    <span className={`${colour} rounded-full py-1 px-3 text-xs text-bold`}>
      {text}
    </span>
  );
}
