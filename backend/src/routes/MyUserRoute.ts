import express from "express";
import MyUserController from "../controllers/MyUserController";
import { jwtCheck } from '../middleware/auth';

const router = express.Router();

// sets up a POST endpoint at /api/my/users
router.post("/", jwtCheck, MyUserController.createCurrentUser);

export default router;
