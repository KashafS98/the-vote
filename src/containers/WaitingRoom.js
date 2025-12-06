import { useEffect, useState } from "react";
import Avatar from "../components/Avatar";
import Card from "../components/Card";
import Heading from "../components/Heading";
import { content } from "../content";
import { socket } from "../socket";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function WaitingRoom({ pregameSetup, players }) {
  const [users, setusers] = useState(players);
  const navigate = useNavigate();
  console.log("players: ", users, pregameSetup);
  useEffect(() => {
    socket.on("new-player", (u) => {
      console.log("new players");
      setusers(u);
    });
    socket.on("start", (data) => {
      navigate("/game", { state: data });
    });
  }, []);

  const startGame = () => {
    socket.emit("start-game", pregameSetup.gameCode);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard: " + text);
  };

  return (
    <>
      <div className="w-full h-full">
        <button
          className="border-none p-1 mb-2"
          onClick={() => copyToClipboard(pregameSetup.gameCode)}
        >
          <Heading size={"h2"} styles={"mb-0"}>
            {content.avatars[pregameSetup.gameType]} Room:{" "}
            {pregameSetup.gameCode}
          </Heading>
        </button>
        {/* <div className="w-1/4">
          <Card
            title={pregameSetup.username}
            text={"🏆: 0"}
            avatar={pregameSetup.avatar}
          />
        </div> */}
        <div className="lg:w-2/3 text-center lg:text-left">
          <Heading styles={"my-4"} size={"h5"}>
            Waiting for players...
          </Heading>
          <div className="flex justify-center lg:justify-normal">
            {users.map((i) => (
              <div
                className="flex flex-col items-center justify-center"
                key={i.name}
              >
                <Avatar emoji={content.avatars[i.avatar]} active={false} />
                <p>{i.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {pregameSetup.created && (
        <Button
          onClick={startGame}
          disabled={players.length < 3 || players.length > 13}
        >
          Start Game
        </Button>
      )}
    </>
  );
}
