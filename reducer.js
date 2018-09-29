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
          { id: state.nextGameIndex, name: action.name, status: "Waiting" }
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
    default:
      return state;
  }
};

module.exports = reducer;
