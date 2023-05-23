const Todo = require("../models/todoModel");

const todoController = {

  createTodo: async (req, res) => {
    try {
      const { title, description, status } = req.body;
      const todo = await Todo.create({
        title,
        description,
        status,
      });
      res.status(201).json({ todo });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong!" });
    }
  },

  getAllTodos: async (req, res) => {
    try {
      const todos = await Todo.findAll();
      res.status(200).json({ todos });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong!" });
    }
  },

  getTodoById: async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await Todo.findByPk(id);
      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }
      res.status(200).json({ todo });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong!" });
    }
  },

  updateTodo: async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    todo.title = title;
    todo.description = description;
    todo.status = status;
    await todo.save();
    res.status(200).json({ todo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong!' });
  }
},

  deleteTodo: async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await Todo.findByPk(id);
      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }
      await todo.destroy();
      res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong!" });
    }
  },
};

module.exports = todoController;
