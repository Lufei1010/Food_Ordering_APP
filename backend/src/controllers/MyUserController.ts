import { Request, Response } from "express";
import User from "../models/user";

// handle the request from api/my/users
const createCurrentUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });

    if (existingUser) {
      res.status(200).send(); // Do not return the response
      return;
    }

    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json(newUser.toObject()); // Do not return the response
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" }); // Do not return the response
  }
};

export default {
  createCurrentUser,
};
