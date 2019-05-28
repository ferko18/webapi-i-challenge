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


//PUT (update )

server.put("/api/users/:id", (req, res)=>{
  //id and object needed 
  const id = req.params.id;
  const changes = req.body;
  db.update(id, changes)
  .then(updatedUser=>{
    if(!updatedUser){return res.status(404).json({error:'The user with specified id does not esist' })}
    else {
      res.status(201).json(changes)
    }
  }
    ).catch(err =>
      res.status(500).json({ error: "could not be modified" }))

})

//DELETE 

server.delete("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  db.remove(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({
         
          message: "The user with the specified ID does not exist"
        });
      } else {
        res.status(204).end();
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user cold not be removed" });
    });
});

server.listen(4000, () => {
  console.log("\n*** Runnin on port 4000 ***\n");
});