/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Leaderboard from "../containers/Leaderboard";
import Heading from "../components/Heading";
import { socket } from "../socket";
import Button from "../components/Button";
import Card from "../components/Card";

import { content } from "../content";
import ResultCard from "../components/ResultCard";

export default function Game() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  const [gameStarted, setGameStarted] = useState(false);
  const [question, setQuestion] = useState(null);
  const [round, setRound] = useState(0);
  const [waiting, setWaiting] = useState(false);
  const [scores, setScores] = useState({});
  const [gameEnd, setGameEnd] = useState(false);
  const [players, setPlayers] = useState(state.players || []);
  const [winnerMsg, setWinnerMsg] = useState("");
  const [answered, setAnswered] = useState(false);
  const [final, setFinal] = useState({});

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

      if (socket.id === newState.players[0]?.id) {
        getQuestion(0);
      }
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

      buildLeaderboard(res);

      // Move to next round after 1 seconds
      setTimeout(() => {
        setWinnerMsg("");
        const nextRound = round + 1;
        if (nextRound < state.maxQuestions) {
          setRound(nextRound);
          getQuestion(nextRound);
        } else {
          setGameEnd(true);
        }
      }, 1000);
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

  function buildLeaderboard(result) {
    console.log("Building leaderboard from result:", result);
    const players =
      result.players || (result.result && result.result.players) || [];
    const scores =
      result.scores || (result.result && result.result.scores) || {};

    const list = players.map((p) => {
      const id = p.id || p.playerid || p.playerId || p.uid || null;
      const score =
        typeof scores[id] === "number"
          ? scores[id]
          : typeof p.score === "number"
          ? p.score
          : 0;
      return { ...p, id, score };
    });

    list.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      const an = (a.name || "").toLowerCase();
      const bn = (b.name || "").toLowerCase();
      return an < bn ? -1 : an > bn ? 1 : 0;
    });

    const topScore = list.length ? Math.max(...list.map((p) => p.score)) : 0;
    const winners = list.filter((p) => p.score === topScore);
    const output = deriveVotedQuestions(result);
    console.log(list, winners, topScore);
    setFinal({ list, winners, topScore, output });
  }

  function deriveVotedQuestions(resultWrapper) {
    const res = resultWrapper.result || resultWrapper || {};
    const votesByQuestion = res.votes || {};
    const playersArr = res.players || res.users || [];
    // map player id -> { name, avatar, ... }
    const playerInfo = playersArr.reduce((m, p) => {
      const id = p.id || p.playerid || p.playerId || p.uid;
      if (id) m[id] = p;
      return m;
    }, {});

    // initialize output for every known player
    const output = Object.keys(playerInfo).reduce((acc, id) => {
      acc[id] = { id, name: playerInfo[id].name || null, questions: [] };
      return acc;
    }, {});

    // For each question, count votes per votedFor id and record voter ids + names
    for (const [question, votes] of Object.entries(votesByQuestion)) {
      const counts = votes.reduce((c, v) => {
        const votedFor = v.votedFor;
        const voterId = v.voter;
        if (!c[votedFor]) c[votedFor] = { count: 0, voters: [] };
        c[votedFor].count += 1;
        c[votedFor].voters.push({
          id: voterId,
          name: playerInfo[voterId]?.name || null,
        });
        return c;
      }, {});

      for (const [playerId, info] of Object.entries(counts)) {
        if (!output[playerId]) {
          output[playerId] = {
            id: playerId,
            name: playerInfo[playerId]?.name || null,
            questions: [],
          };
        }
        output[playerId].questions.push({
          question,
          count: info.count,
          voters: info.voters, // array of { id, name }
        });
      }
    }

    return output;
  }

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
            title={`${content.avatars[i.avatar]} ${i.name}`} // emoji + name
            onClick={() => sendAnswer(i)}
            disabled={answered}
          />
        ))}
    </div>
  );

  return (
    <div className="h-screen w-screen text-center flex flex-col items-center justify-between lg:text-left lg:flex-row">
      <div className="w-full p-10 mx-auto flex flex-col justify-center text-center">
        {gameEnd ? (
          <div className="w-full p-20">
            {final.list.length > 0 && (
              <div className="text-left mb-4">
                <div className="flex flex-wrap justify-center">
                  {final.list.map((p, index) => (
                    <ResultCard
                      data={final.output[p.id]}
                      result={final}
                      key={p.id}
                      winner={index === 0}
                    />
                  ))}
                </div>
              </div>
            )}
            <Button onClick={exitGame}>Exit Game</Button>
          </div>
        ) : (
          <>
            {question && !winnerMsg && (
              <>
                <Heading size="h2" color={"text-purple"}>
                  Round {round + 1} / {state.maxQuestions}
                </Heading>{" "}
                <br />
                <Question currentQuestion={question} />
                {!waiting && <Options players={players} />}
              </>
            )}
            <br />
            {waiting && (
              <Heading size="h6" color={"text-purple/75"}>
                Waiting for all answers...
              </Heading>
            )}
            {winnerMsg && (
              <Heading size="h2" styles="text-green-600 animate-pulse">
                {winnerMsg}
              </Heading>
            )}
          </>
        )}
      </div>

      {!gameEnd && (
        <div className="lg:h-full lg:shadow-lg lg:w-1/4 lg:p-16 flex flex-col justify-center items-center relative">
          <Leaderboard
            players={players}
            restartGame={() => socket.emit("start-game", state.gameCode)}
            exitGame={exitGame}
          />
        </div>
      )}
    </div>
  );
}
