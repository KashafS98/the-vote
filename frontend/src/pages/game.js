/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Countdown from "react-countdown";

import Leaderboard from "../containers/Leaderboard";
import Heading from "../components/Heading";
import { socket } from "../socket";
import Button from "../components/Button";
import Card from "../components/Card";

export default function Game() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  const [countdown, setCountdown] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [question, setQuestion] = useState(null);
  const [round, setRound] = useState(0);
  const [waiting, setWaiting] = useState(false);
  const [scores, setScores] = useState({});
  const [gameEnd, setGameEnd] = useState(false);
  const [players, setPlayers] = useState(state.players || []);
  const [winnerMsg, setWinnerMsg] = useState("");
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    // Game started or restarted
    socket.on("start", (newState) => {
      setGameStarted(true);
      setGameEnd(false);
      setRound(0);
      setQuestion(null);
      setWaiting(false);
      setAnswered(false);
      setScores({});
      setPlayers(newState.players || []);
      setCountdown(true);

      setTimeout(() => {
        setCountdown(false);
        // Request first question only if room creator
        if (socket.id === newState.players[0]?.id) {
          getQuestion(0);
        }
      }, 5000);
    });

    // Receive question from backend
    socket.on("question", ({ question: q, round: r }) => {
      setQuestion(q);
      setRound(r - 1); // backend 1-indexed
      setWaiting(false);
      setAnswered(false);
    });

    // Receive round result
    socket.on("result", (res) => {
      setWaiting(false);
      setPlayers(res.players);
      setScores(res.scores);
      setWinnerMsg(
        `Winner${res.winners.length > 1 ? "s" : ""}: ${res.winners
          .map((w) => w.name)
          .join(", ")}!`
      );

      // Move to next round after 3 seconds
      setTimeout(() => {
        setWinnerMsg("");
        const nextRound = round + 1;
        if (nextRound < state.maxQuestions) {
          setRound(nextRound);
          getQuestion(nextRound);
        } else {
          setGameEnd(true);
        }
      }, 3000);
    });

    socket.on("game-end", ({ scores, players }) => {
      setScores(scores);
      setPlayers(players);
      setGameEnd(true);
    });

    return () => {
      socket.off("start");
      socket.off("question");
      socket.off("result");
      socket.off("game-end");
    };
  }, [round, state.maxQuestions]);

  const getQuestion = (roundIndex) => {
    socket.emit("question", state.gameCode, roundIndex);
  };

  const sendAnswer = (answer) => {
    if (answered) return; // prevent double submission
    socket.emit("answer", {
      roomname: state.gameCode,
      playerid: socket.id,
      question,
      answer,
    });
    setWaiting(true);
    setAnswered(true);
  };

  const exitGame = () => {
    navigate("/");
  };

  const countdownRenderer = ({ seconds, completed }) => {
    if (completed) return <Heading size="h1">Go!</Heading>;
    return <Heading size="h1">{seconds}</Heading>;
  };

  const Question = ({ currentQuestion }) => (
    <Heading size="h1">{currentQuestion}</Heading>
  );

  const Options = ({ players }) => (
    <div className="flex flex-wrap justify-between mt-4">
      {players
        .filter((i) => i.id !== socket.id)
        .map((i) => (
          <Card
            key={i.id}
            title={`${i.avatar} ${i.name}`} // emoji + name
            onClick={() => sendAnswer(i)}
            disabled={answered}
          />
        ))}
    </div>
  );

  return (
    <div className="h-screen w-screen text-center flex flex-col items-center justify-between lg:text-left lg:flex-row">
      <div className="w-full lg:w-1/2 p-10 mx-auto flex flex-col justify-center text-center">
        {gameEnd ? (
          <>
            <Heading size="h1">Game Over!</Heading>
            <Heading size="h2">Final Scores:</Heading>
            <ul className="mb-4">
              {players.map((p) => (
                <li key={p.id}>
                  {p.avatar} {p.name}: {p.score}
                </li>
              ))}
            </ul>
            <Button onClick={exitGame}>Exit Game</Button>
          </>
        ) : (
          <>
            {countdown && round === 0 && (
              <Countdown
                date={Date.now() + 5000}
                renderer={countdownRenderer}
              />
            )}
            {!countdown && question && !winnerMsg && (
              <>
                <Heading size="h2">
                  Round {round + 1} / {state.maxQuestions}
                </Heading>
                <Question currentQuestion={question} />
                {!waiting && <Options players={players} />}
              </>
            )}
            {waiting && <Heading size="h2">Waiting for all answers...</Heading>}
            {winnerMsg && (
              <Heading size="h2" styles="text-green-600 animate-pulse">
                {winnerMsg}
              </Heading>
            )}
          </>
        )}
      </div>

      <div className="lg:h-full lg:shadow-lg lg:w-1/4 lg:p-16 flex flex-col justify-center items-center relative">
        <Leaderboard
          players={players}
          restartGame={() => socket.emit("start-game", state.gameCode)}
          exitGame={exitGame}
        />
      </div>
    </div>
  );
}
