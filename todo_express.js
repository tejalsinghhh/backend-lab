const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let todos = ["Buy groceries", "Learn Express", "Do yoga"];

// Welcome route
app.get("/", (req, res) => {
  res.send("Welcome to my ToDo List 🚀");
});

// Get all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// Add new todo
app.post("/todos", (req, res) => {
  const { item } = req.body;
  todos.push(item);
  res.json({ message: "Todo added", todos });
});

// Delete todo by index
app.delete("/todos/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < todos.length) {
    const removed = todos.splice(index, 1);
    res.json({ message: "Todo deleted", removed, todos });
  } else {
    res.status(400).json({ error: "Invalid index" });
  }
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});
