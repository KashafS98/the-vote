export default function Tooltip({ message, children, trigger = "hover" }) {
  const triggerMap = {
    hover: " group-hover:scale-100",
    none: "scale-100",
  };
  return (
    <div class="group relative flex">
      {children}
      <span
        class={`absolute w-max mx-2 left-full scale-0 transition-all rounded bg-grey p-2 text-xs text-white ${triggerMap[trigger]}`}
      >
        {message}
      </span>
    </div>
  );
}
