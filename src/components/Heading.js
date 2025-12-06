export default function Heading({ size, children, styles, color }) {
  const sizeMapping = {
    h1: "text-5xl",
    h2: "text-3xl",
    h3: "text-2xl",
    h4: "text-xl",
    h5: "text-lg",
    h6: "text-md",
  };
  return (
    <h1 className={sizeMapping[size] + " font-bold " + styles + " " + color}>
      {children}
    </h1>
  );
}
