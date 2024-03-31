import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import connectToDB from "./db/connectToMongoDB.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json()); // Middleware for parsing JSON bodies

app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Server is ready");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectToDB();
});
