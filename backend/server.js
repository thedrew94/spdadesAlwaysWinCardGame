require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

app.use(cookieParser());

// Middleware to enable CORS
app.use(
  cors({
    // Allow requests from your frontend
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    // Allowed headers
    allowedHeaders: ["Content-Type", "Authorization"],
    // Allow cookies to be sent
    credentials: true,
  })
);

// Middleware to parse JSON bodies with a 10MB limit
// requests that have Content-Type: application/json in their headers
app.use(express.json({ limit: "10mb" }));

// Middleware to parse URL-encoded bodies (e.g., form data) with a 10MB limit
// parses incoming requests with URL-encoded payloads, typically from HTML forms content-Type: application/x-www-form-urlencoded in their headers
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Serve static files from the 'public' folder
app.use(express.static("public"));

// Global error handler TODO to redifine
app.use((err, req, res, next) => {
  res.status(500).json({
    error: "Unexpected error occurred",
    message: `Please try again later : ${err}`,
  });
});

// Catch-all route for unhandled routes
app.all("/{*splat}", async (req, res) => {
  res.status(404).json({
    status: "fail",
    message: `Cannot find ${req.originalUrl} on this server`,
  });
});
