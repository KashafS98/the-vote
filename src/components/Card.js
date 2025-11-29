import { content } from "../content";

export default function Card({ title, avatar, onClick }) {
  return (
    <div
      className="m-1 flex flex-col items-center justify-center bg-white shadow-lg rounded-xl p-4 w-full cursor-pointer hover:scale-105 transform transition-all duration-300"
      onClick={onClick}
    >
      <span className="text-5xl mb-2">{content.avatars[avatar]}</span>
      <span className="font-semibold text-lg">{title}</span>
    </div>
  );
}
