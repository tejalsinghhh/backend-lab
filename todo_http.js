const http = require("http");

let todos = ["Buy groceries", "Learn Node.js", "Do workout"];

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.method === "GET" && req.url === "/") {
    // Welcome route
    res.end(JSON.stringify({ message: "Welcome to my ToDo List 🚀" }));
  }
  else if (req.method === "GET" && req.url === "/todos") {
    // Get all todos
    res.end(JSON.stringify(todos));
  } 
  else if (req.method === "POST" && req.url === "/todos") {
    // Add new todo
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      const { item } = JSON.parse(body);
      todos.push(item);
      res.end(JSON.stringify({ message: "Todo added", todos }));
    });
  } 
  else if (req.method === "DELETE" && req.url.startsWith("/todos/")) {
    // Delete todo by index
    const index = parseInt(req.url.split("/")[2]);
    if (index >= 0 && index < todos.length) {
      const removed = todos.splice(index, 1);
      res.end(JSON.stringify({ message: "Todo deleted", removed, todos }));
    } else {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: "Invalid index" }));
    }
  }
  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Not found" }));
  }
});

server.listen(3000, () => {
  console.log("HTTP server running at http://localhost:3000");
});
