export function Card({ heading, body, className }) {
  return (
    <div
      className={`flex flex-col p-4 rounded-md border-2 items-center ${className}`}
    >
      <h2 className="text-xl">{heading}</h2>
      <p className="text-lg">{body}</p>
    </div>
  );
}
