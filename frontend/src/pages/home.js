import { useEffect, useState } from "react";
import Layout from "../containers/Layout";
import { Navigate } from "react-router-dom";
import { IoChevronBackCircleOutline } from "react-icons/io5";

import UserDetails from "../containers/UserDetails";
import JoinGame from "../containers/JoinGame";
import CreateGame from "../containers/CreateGame";

import WaitingRoom from "../containers/WaitingRoom";
import { socket } from "../socket";

export default function Home() {
  const [players, setPlayers] = useState([]);
  const [step, setstep] = useState(0);
  const [pregameSetup, setpregameSetup] = useState({
    created: false,
    gameCode: null,
    gameType: null,
    username: null,
    avatar: null,
  });
  const resetGame = (msg) => {
    setstep(0);
    setpregameSetup({
      created: false,
      gameCode: null,
      gameType: null,
      username: null,
      avatar: null,
    });
    console.log(msg);
  };

  useEffect(() => {
    // socket.on("connect", onConnect);
    socket.on("new-player", (u) => setPlayers(u));
    socket.off("disconnect", () => {
      resetGame(pregameSetup.roomname);
    });
  }, []);

  const handleNext = () => {
    setstep(step + 1);
    if (step === 0) {
      socket.connect();
    }
  };

  const joinGame = (code) => {
    // set up preGame
    setpregameSetup({ ...pregameSetup, gameCode: code, created: false });
    //next step
    handleNext();
  };

  const createGame = (type) => {
    // service: creategame/:type; returns game code; set up preGame
    // temp codegen -
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setpregameSetup({
      ...pregameSetup,
      gameCode: randomNum,
      created: true,
      gameType: type,
    });
    // socket.emit("create", randomNum);
    //next step
    handleNext();
  };

  const saveUser = async (avatar, username) => {
    // setpregameSetup({ ...pregameSetup, avatar, username });
    // service:AddNewPlayer/:preGameSetup; adds user to room; socket start; returns status/room info
    if (pregameSetup.created) {
      socket.emit("create-game", {
        name: username,
        avatar,
        gameType: pregameSetup.gameType,
      });
      socket.on("gameCode", (arg) => {
        console.log(arg);
        setpregameSetup({ ...pregameSetup, gameCode: arg, avatar, username });
        if (navigator.clipboard) {
          navigator.clipboard.writeText(arg);
        }
      });
      socket.on("init", (arg) => {
        console.log(arg);
      });
    } else {
      setpregameSetup({ ...pregameSetup, avatar, username });
      socket.emit("join-game", {
        name: username,
        avatar,
        roomname: pregameSetup.gameCode,
      });
      socket.on("unknownCode", (arg) => {
        resetGame("unknown game");
      });
      socket.on("tooManyPlayers", (arg) => {
        resetGame("Room full");
      });
    }
    socket.on("new-player", (u) => {
      console.log("geting new players", u);
      setPlayers(u);
    });
    // socket.emit("join-server", username, avatar);

    // next step - waiting room
    setstep(step + 1);
  };

  return (
    <Layout styles={"flex flex-col justify-center items-center"}>
      {step !== 0 && (
        <div
          className="absolute top-10 left-10 text-3xl text-purple cursor-pointer"
          onClick={() => {
            alert("Your changes will be lost");
            setstep(step - 1);
            socket.disconnect();
          }}
        >
          <IoChevronBackCircleOutline />
        </div>
      )}
      {step === 0 && (
        <>
          <JoinGame handleNext={joinGame} />
          <CreateGame handleNext={createGame} />
        </>
      )}
      {/* {step === 1 && <GameDetails handleNext={createGame} />} */}
      {step === 1 && <UserDetails handleNext={saveUser} />}
      {step === 2 && (
        <WaitingRoom pregameSetup={pregameSetup} players={players} />
        // <Navigate to="/waiting" replace={true} state={pregameSetup} />
      )}
    </Layout>
  );
}
