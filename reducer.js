const createAuthKey = require("./utils/create-auth-key");

const defaultState = {
  nextGameIndex: 0,
  nextPlayerIndex: 0,
  games: [],
  players: []
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_GAME":
      return {
        ...state,
        nextGameIndex: state.nextGameIndex + 1,
        games: [
          ...state.games,
          {
            id: state.nextGameIndex,
            name: action.name,
            status: "Waiting",
            players: [action.authKey]
          }
        ]
      };
    case "ADD_PLAYER":
      return {
        ...state,
        nextPlayerIndex: state.nextPlayerIndex + 1,
        players: [
          ...state.players,
          {
            id: state.nextPlayerIndex,
            authKey: createAuthKey(String(state.nextPlayerIndex))
          }
        ]
      };
    case "JOIN_GAME":
      const game = state.games.find(game => game.id === action.gameId);

      const gameNotFound = game === undefined;
      if (gameNotFound) return { ...state };

      const alreadyJoined = game.players.includes(action.authKey);
      const gameAlreadyStarted = game.status === "Started";
      if (alreadyJoined || gameAlreadyStarted) return { ...state };

      const newGames = state.games.map(game => {
        if (game.id !== action.gameId) return game;

        return {
          ...game,
          status: game.players.length === 1 ? "Started" : "Waiting",
          players: [...game.players, action.authKey]
        };
      });

      return {
        ...state,
        games: newGames
      };
    default:
      return state;
  }
};

module.exports = reducer;
