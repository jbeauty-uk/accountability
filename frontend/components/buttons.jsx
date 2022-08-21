export function PrimaryButton({ text, onClick = () => {} }) {
  return (
    <button
      className="px-4 py-2 font-semibold text-sm bg-sky-400 text-white rounded-full shadow-sm"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
