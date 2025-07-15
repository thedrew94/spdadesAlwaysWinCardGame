require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");

// Environment arguments
const PORT = process.env.PORT || 5175;

// Routes imports
const globalRoutes = require("./routes/globalRoutes");

// Initialize Express app
const app = express();

// Create HTTP server for Socket.IO
const server = http.createServer(app);

// Initialize Socket.IO with CORS configuration
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"], // Match frontend origins
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies with Socket.IO
  },
});

// Middleware setup
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(cookieParser()); // Parse cookies
app.use(express.json({ limit: "10mb" })); // Parse JSON bodies
app.use(express.urlencoded({ limit: "10mb", extended: true })); // Parse URL-encoded bodies
app.use(express.static("public")); // Serve static files from 'public' folder

// Sample route
app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

// Mount the routes
app.use("/api", globalRoutes(io));

// // Example API route with Socket.IO integration
// app.post("/api/message", (req, res) => {
//   const { message } = req.body;
//   if (!message) {
//     return res.status(400).json({ status: "fail", message: "Message is required" });
//   }
//   // Emit message to all connected clients via Socket.IO
//   io.emit("newMessage", { message, timestamp: new Date().toISOString() });
//   res.status(200).json({ status: "success", message: "Message sent" });
// });

// Socket.IO connection handler
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Example: Handle a custom event from the client
  socket.on("sendMessage", (data) => {
    console.log("Message received:", data);
    // Broadcast message to all clients
    io.emit("newMessage", { message: data.message, timestamp: new Date().toISOString() });
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Catch-all route for unhandled routes
app.all("/{*splat}", async (req, res) => {
  res.status(404).json({
    status: "fail",
    message: `Cannot find ${req.originalUrl} on this server`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error for debugging
  res.status(500).json({
    status: "error",
    message: `Unexpected error occurred: ${err.message}`,
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
