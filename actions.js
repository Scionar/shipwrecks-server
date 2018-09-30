module.exports.addGame = (name, authKey) => ({
  type: "ADD_GAME",
  name,
  authKey
});

module.exports.addPlayer = () => ({
  type: "ADD_PLAYER"
});
