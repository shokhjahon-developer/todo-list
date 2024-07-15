const Todo = require("../models/todo.model");
const Joi = require("joi");

const get = async (req, res) => {
  try {
    const { id } = req.user;
    const userToDos = await Todo.find({ userID: id });

    res.json({ message: "Success", data: userToDos });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const post = async (req, res) => {
  try {
    const { task, status } = req.body;
    const { id } = req.user;

    const check = Joi.object({
      task: Joi.string().min(6).required(),
      status: Joi.string().min(6).required(),
    });

    const { error } = check.validate({ task, status });
    if (error) return res.status(400).json({ message: error.message });

    const newTodo = await Todo.create({
      task: task,
      status: status,
      userID: id,
    });

    res
      .status(201)
      .json({ message: "A new task has been added!", data: newTodo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const put = async (req, res) => {
  try {
    const { task, status } = req.body;

    const { id } = req.params;

    const check = Joi.object({
      task: Joi.string().min(6).required(),
      status: Joi.string().min(6).required(),
    });

    const { error } = check.validate({ task, status });
    if (error) return res.status(400).json({ message: error.message });

    const updatedTask = await Todo.findByIdAndUpdate(
      id,
      {
        $set: { task: task, status: status },
      },
      { new: true }
    );

    if (!updatedTask) {
      return res
        .status(404)
        .json({ message: "This kind of task has not been found!" });
    }

    res.json({
      message: "This task has been edited successfully!",
      data: updatedTask,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteTask = await Todo.findByIdAndDelete(id);

    if (!deleteTask) {
      return res
        .status(404)
        .json({ message: "This kind of task has not been found!" });
    }

    res.json({ message: "This task has been deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports = {
  get,
  post,
  put,
  remove,
};
