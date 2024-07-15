const { Schema, model } = require("mongoose");

const toDoSchema = new Schema({
  userID: {
    type: String,
  },

  task: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    required: true,
  },
});

const Todo = model("toDos", toDoSchema);

module.exports = Todo;
