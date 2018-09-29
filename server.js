const express = require("express");
const store = require('./store');
const { addPlayer } = require('./actions');
const app = express();

app.get("/", (req, res) => res.send("Shipwrecks server"));

app.post("/player", (req, res) => {
  store.dispatch(addPlayer());
  // Todo: Identify better which user was last added
  const player = store.getState().players.find(
    item => item.id === store.getState().nextPlayerIndex - 1
  );
  res.json({ authKey: player.authKey })
});

app.listen(process.env.PORT, () =>
  console.log(`Shipwrecks server listening on port ${process.env.PORT}!`)
);
