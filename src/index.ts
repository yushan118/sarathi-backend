// Importing required modules and packages
import express from "express";    // Web framework for Node.js
import http from "http";    // HTTP server module
import bodyParser from "body-parser";   // Parses incoming request bodies
import cookieParser from "cookie-parser";   // Parses cookies
import compression from "compression";    // Middleware for response compression
import cors from "cors";    // Middleware for enabling Cross-Origin Resource Sharing (CORS)
import mongoose from "mongoose";    // MongoDB object modeling tool
import "dotenv/config";   // Loads environment variables from a .env file
import morgan from "morgan";    // HTTP request logger
import { Server } from "socket.io";     // WebSocket library

import router from "./router";     // Importing the router module


// Creating an Express application
const app = express();


// Configuring middleware
app.use(
  cors({
    credentials: true,    // Allow credentials (cookies, HTTP authentication) in CORS requests
  })
);

app.use(compression());    // Using compression middleware for response compression
app.use(cookieParser());    // Parsing cookies from incoming requests
app.use(bodyParser.json());   // Parsing JSON data from incoming requests
app.use(morgan("dev"))    // Using Morgan for HTTP request logging in development mode

// Creating an HTTP server with the Express app
const server = http.createServer(app);

// Creating a WebSocket server (Socket.IO) attached to the HTTP server
export const io = new Server(server, {
  cors: {
    origin: "*",    // Allowing connections from any origin
  }
});

// Getting the port from the environment variable
const port = process.env.PORT;

// Starting the HTTP server and listening on the specified port
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Connecting to MongoDB using Mongoose
const MONGO_URL = process.env.MONGO_URL;
mongoose.Promise = Promise;   // Setting the default Promise library
mongoose.connect(MONGO_URL);    // Connecting to MongoDB
mongoose.connection.on("error", (error: Error) => console.log(error));    // Handling MongoDB connection errors

// Mounting the router at the "/api" endpoint
app.use("/api", router());
