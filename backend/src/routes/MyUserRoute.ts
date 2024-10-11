import express from "express";
import MyUserController from "../controllers/MyUserController";
import { jwtCheck, jwtParse } from '../middleware/auth';
import { validateMyUserRequest } from "../middleware/validation";

const router = express.Router();

// sets up a POST endpoint at /api/my/users
router.post("/", jwtCheck, MyUserController.createCurrentUser);
router.put("/", jwtCheck, jwtParse, validateMyUserRequest, MyUserController.updateCurrentUser);


export default router;
//handler and controller that handles the request to create a new user