// implement your API here

const express = require("express");
const db = require("./data/db");
const cors = require('cors');

const server = express();
server.listen(4000, () => {
    console.log("\n*** Running on port 4000 ***\n");
  });