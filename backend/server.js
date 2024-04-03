import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import express from "express";
import { app, server } from "./socket/socket.js";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
import userRouter from "./routes/user.route.js";
import path from "path";

import connectToDB from "./db/connectToMongoDB.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); // Middleware for parsing JSON bodies
app.use(cookieParser()); // Middleware for parsing cookies

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
app.use("/api/user", userRouter);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/dist/index.html"));
});

// app.get("/", (req, res) => {
//   res.send("Server is ready");
// });
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectToDB();
});
