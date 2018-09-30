const express = require("express");
const bodyParser = require("body-parser");
const store = require("./store");
const { addPlayer, addGame } = require("./actions");
const app = express();

app.use(bodyParser.json({ type: "application/json" }));

app.get("/", (req, res) => res.send("Shipwrecks server"));

app.post("/player", (req, res) => {
  store.dispatch(addPlayer());
  // Todo: Identify better which user was last added
  const player = store
    .getState()
    .players.find(item => item.id === store.getState().nextPlayerIndex - 1);
  res.json({ authKey: player.authKey });
});

app.post("/game", (req, res, next) => {
  const gameName = req.body.name;
  const authKey = req.get('Auth-key');
  store.dispatch(addGame(gameName, authKey));
  res.json({});
});

app.get("/game", (req, res) => {
  res.json({ games: store.getState().games });
});

app.listen(process.env.PORT, () =>
  console.log(`Shipwrecks server listening on port ${process.env.PORT}!`)
);
