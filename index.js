// implement your API here

const express = require("express");
const db = require("./data/db");
const cors = require("cors");
const server = express();

//middlewares needed
server.use(express.json());
server.use(cors());

//get home
server.get("/", (req, res) => {
  res.send("wellcome to port 4000");
});

server.listen(4000, () => {
  console.log("\n*** Running on port 4000 ***\n");
});

//GET users

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json({ users });
    })
    .catch(err =>
      res.status(500).json({ error: "users could not be retrived" })
    );
});
