import Heading from "../components/Heading";
import Button from "../components/Button";
import { content } from "../content";

export default function Leaderboard({ players, restartGame, exitGame }) {
  const sorted = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <Heading size="h2">Leaderboard</Heading>
      <ul className="w-full">
        {sorted.map((p) => (
          <li
            key={p.id}
            className="flex justify-between py-1 px-2 bg-white rounded-lg mb-1 shadow-sm items-center"
          >
            <span className="flex items-center gap-2">
              <span className="text-xl">{content.avatars[p.avatar]}</span>
              {p.name}
            </span>
            <span>{p.score}</span>
          </li>
        ))}
      </ul>

      <div className="flex gap-4">
        {/* <Button onClick={restartGame}>Restart Game</Button> */}
        {/* <Button onClick={exitGame}>Exit Game</Button> */}
      </div>
    </div>
  );
}
