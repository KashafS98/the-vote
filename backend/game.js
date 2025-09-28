const { questions } = require("./questions");
const { sampleSize } = require("./utils");

function initGame(data) {
  const state = createGameState(data);
  return state;
}

function createGameState(data) {
  // Ensure unique questions for each game session
  let pool = [...questions.questions];
  let questionsArr = [];
  while (questionsArr.length < 10 && pool.length > 0) {
    const idx = Math.floor(Math.random() * pool.length);
    questionsArr.push(pool[idx]);
    pool.splice(idx, 1);
  }
  return {
    players: [],
    gameCode: data.roomName,
    gameType: data.gameType,
    maxPlayers: 12,
    maxQuestions: 10,
    round: 0,
    questions: questionsArr,
    answers: questionsArr.reduce(
      (o, key) => Object.assign(o, { [key]: [] }),
      {}
    ),
    scores: {}, // playerid: score
    votes: {}, // question: [{ voter: id, votedFor: id }]
    finished: false,
  };
}

module.exports = {
  initGame,
};
