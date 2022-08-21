export default function PageHeading({ heading, subheading }) {
  return (
    <div>
      <h1 className="text-3xl">{heading}</h1>
      {subheading && <h2>{subheading}</h2>}
    </div>
  );
}
