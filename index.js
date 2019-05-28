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
  db.find()//get users from the database 
    .then(users => {
      res.status(200).json( users ); //can use send instead of json
    })
    .catch(err =>
      res.status(500).json({ error: "users could not be retrived" })
    );
});

//POST Users 
server.post("/api/users", (req, res) => {
  const newUser = req.body;
  db.insert(newUser)
    .then(useradded => {
      res.status(201).json( useradded ); 
    })
    .catch(err =>
      res.status(500).json({ error: "user could not be added" })
    );
});


// server.post("/api/users", (req, res) => {
//   const { name, bio } = req.body;
//   const newUser = req.body;
//   if (!name || !bio) {
//     return res
//       .status(400)
//       .json({ errorMessage: "Please provide name and bio for the user." });
//   }

//   db.insert(newUser)
//     .then(user => {
//       res.status(201).json({ success: true, user });
//     })
//     .catch(err => {
//       res.status(500).json({
//         success: false,
//         error: "There was an error while saving the user to the database"
//       });
//     });
// });