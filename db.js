const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://amrit:iamahokage@cluster0.7zpjout.mongodb.net/todos"
);

const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const todo = mongoose.model("todos", todoSchema);

module.exports = {
  todo,
};
