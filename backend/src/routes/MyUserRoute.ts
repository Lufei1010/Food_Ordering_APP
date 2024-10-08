import express from "express";
import MyUserController from "../controllers/MyUserController";

const router = express.Router();

// sets up a POST endpoint at /api/my/users
router.post("/", MyUserController.createCurrentUser);

export default router;
