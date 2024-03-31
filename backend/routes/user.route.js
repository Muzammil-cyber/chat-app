import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getSidebarUsers } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/", protectRoute, getSidebarUsers);

export default userRouter;
