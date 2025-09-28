export default function Heading({ size, children, styles }) {
  const sizeMapping = {
    h1: "text-5xl",
    h2: "text-3xl",
    h3: "text-2xl",
    h4: "text-xl",
  };
  return (
    <h1 className={sizeMapping[size] + " font-bold mb-4 " + styles}>
      {children}
    </h1>
  );
}
