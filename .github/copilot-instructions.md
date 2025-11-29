# Copilot Instruction Template for "The Vote" Game

project:
  name: The Vote
  type: Multiplayer Voting Game
  description: >
    A real-time multiplayer voting game where players vote on answers
    corresponding to the players in the room. Game modes: work-friendly or NSFW.

frontend:
  framework: React
  styling: Tailwind CSS
  structure:
    pages: src/pages/
      - home.js
      - waiting.js
      - game.js
    components: src/components/
    containers: src/containers/
    socket: src/socket.js
  ui:
    style: Modern, polished, responsive
    countdown: Prominent for each question
    typography: Clear for questions and answers
    transitions: Smooth between game states
  integration:
    socketEvents: 
      - question
      - result
      - game-end
      - new-player
    fetchOrAjax: Optional for asynchronous data
  additionalFeatures:
    - username customization
    - chat within room
    - graceful leave for players

backend:
  framework: Node.js + Express
  websocket: socket.io
  structure:
    main: backend/app.js
    gameLogic: backend/game.js
    questions: backend/questions.js
    utils: backend/utils.js
  roomState:
    type: work | nsfw
    players: []
    scores: {}
    currentRound: 0
    currentQuestion: {}
    answers: {}
  socketEvents:
    - create-game
    - join-game
    - start-game
    - question
    - answer
    - result
    - game-end
    - new-player
  logic:
    - handle room creation and joining
    - track answers per round
    - calculate scores and handle ties
    - emit events to all players in the room
    - progress through 10 rounds

gameFlow:
  rounds: 10
  steps:
    - Room Creation:
        hostCreates: true
        selectType: work | nsfw
        generateCode: true
    - Joining the Room:
        shareCode: true
        updateRoomState: true
        emitNewPlayer: true
    - Starting the Game:
        hostStart: true
        emitCountdown: 5 seconds
    - Question Phase:
        selectQuestion: based on game type
        answerOptions: all players
        emitQuestionEvent: true
    - Player Responses:
        submitAnswer: record in room.answers
        showWaiting: true
    - Scoring:
        calculateScores: 1 point for top voted
        handleTies: both get point
        emitResult: true
    - Next Round:
        incrementRound: true
        repeat: until 10 rounds
    - Game End:
        emitGameEnd: final scores
        displayLeaderboard: true
