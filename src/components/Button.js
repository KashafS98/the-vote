export default function Button({
  text,
  size = "md",
  styles,
  onClick,
  children,
  disabled = false,
}) {
  const sizeMapping = {
    sm: "py-1 px-12 text-0.8",
    md: "px-4 py-2 text-0.8",
  };
  return (
    <button
      onClick={onClick}
      className={`${sizeMapping[size]} rounded-full ${
        disabled ? "bg-grey cursor-not-allowed border-none" : "bg-purple"
      } text-white my-2 ${styles}`}
    >
      {children || text}
    </button>
  );
}
