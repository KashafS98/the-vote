import { useState } from "react";
import MiniForm from "./MiniForm";
import { content } from "../content";

export default function JoinGame({ setoptions, handleNext }) {
  const [gameCode, setgameCode] = useState(null);

  const handleInput = (e) => {
    setgameCode(e.target.value);
  };

  return (
    <MiniForm
      title={`Join an existing ${content.game}`}
      placeholder={`Enter ${content.game} code`}
      onClick={setoptions}
      handleChange={handleInput}
      handleSubmit={() => handleNext(gameCode)}
    />
  );
}
