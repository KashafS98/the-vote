import { useEffect, useState } from "react";
import Avatar from "../components/Avatar";
import Card from "../components/Card";
import Heading from "../components/Heading";
import { content } from "../content";
import { socket } from "../socket";
import Button from "../components/Button";
import { redirect, useNavigate } from "react-router-dom";

export default function WaitingRoom({ pregameSetup, players }) {
  const [users, setusers] = useState(players);
  const navigate = useNavigate();
  console.log("players: ", users);
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

  return (
    <>
      <div className="flex justify-between w-full h-full">
        <div>
          <Card
            title={pregameSetup.username}
            text={"🏆: 0"}
            avatar={content.avatars[pregameSetup.avatar]}
          />
        </div>
        <div className="w-2/3">
          <div className="border-2 border-dotted border-purple w-min	">
            <Heading styles={"mb-0"} size={"h2"}>
              {pregameSetup.gameCode}
            </Heading>
          </div>
          <div className="mb-2">Game Type: {pregameSetup.gameType}</div>
          <Heading styles={"mb-0"} size={"h4"}>
            Players:
          </Heading>
          <div className="flex">
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
