import { content } from "../content";

export default function Card({ title, avatar, onClick }) {
  return (
    <div
      className="flex flex-col items-center justify-center bg-white shadow-lg rounded-xl p-4 w-40 cursor-pointer hover:scale-105 transform transition-all duration-300"
      onClick={onClick}
    >
      <span className="text-5xl mb-2">{content.avatars[avatar]}</span>
      <span className="font-semibold text-lg">{title}</span>
    </div>
  );
}
