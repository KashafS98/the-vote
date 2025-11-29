import React from "react";

export default function IconCircle({ icon, title, text }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="p-2 border-purple text-purple text-3xl rounded-full">
        {icon}
      </div>
      <p className="font-bold">{title}</p>
      <p className="">{text}</p>
    </div>
  );
}
