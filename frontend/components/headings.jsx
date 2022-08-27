export function PageHeading({ heading, subheading }) {
  return (
    <div>
      <h1>{heading}</h1>
      {subheading && <p>{subheading}</p>}
    </div>
  );
}

export function SectionHeading({ heading, subheading }) {
  return (
    <div>
      <h2>{heading}</h2>
      {subheading && <p>{subheading}</p>}
    </div>
  );
}
