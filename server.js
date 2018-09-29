const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Shipwrecks server"));



app.listen(process.env.PORT, () =>
  console.log(`Shipwrecks server listening on port ${port}!`)
);
