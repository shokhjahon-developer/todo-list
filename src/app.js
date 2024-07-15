const express = require("express");
const { connect } = require("mongoose");
const app = express();

require("./start/modules")(app, express);

async function connectToDb() {
  try {
    connect("mongodb://localhost:27017/toDoList");
    console.log("Connected to Db");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

connectToDb();

require("./start/run")(app);
