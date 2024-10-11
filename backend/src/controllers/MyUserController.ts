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

const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { name, addressLine1, country, city } = req.body;
    const user = await User.findById(req.userId)

    if(!user){
      return res.status(404).json({ message: "User not found" })
    }

    user.name = name;
    user.addressLine1 = addressLine1;
    user.country = country;
    user.city = city;

    await user.save();

    res.send(user);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error updating user" }); 
  }
}

export default {
  createCurrentUser,
  updateCurrentUser,
};
