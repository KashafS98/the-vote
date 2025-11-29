import { FcOk } from "react-icons/fc";

export default function Avatar({
  emoji,
  active = true,
  color,
  onClick,
  hover,
  size = "md",
}) {
  return (
    <div
      className={`${active && "relative"} shadow ${
        size === "md" && "w-20 h-20 text-4xl"
      } ${
        size === "sm" && "w-20 h-20 text-3xl"
      } rounded-full flex items-center justify-center m-1 ${color} ${
        hover &&
        "hover:scale-95 hover:opacity-70 hover:shadow-lg transition-all cursor-pointer"
      }`}
      onClick={onClick}
    >
      {emoji}
      {active && (
        <div className="absolute top-0 text-2xl right-0">
          <FcOk />
        </div>
      )}
    </div>
  );
}
