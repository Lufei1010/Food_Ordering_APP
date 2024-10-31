import { Request, Response } from 'express';
import Restaurant from '../models/restaurant';
import cloudinary from 'cloudinary';
import mongoose from 'mongoose';

const getMyRestaurant = async (req: Request, res: Response) => {
    try{
        const restaurants = await Restaurant.findOne({ user: req.userId });
        if(!restaurants) {
            return res.status(404).json({ message: "Restaurant not found" });
        }
        res.json(restaurants);
    } catch(error) {
        console.log("error", error);
        res.status(500).json({ message: "Error fetching restaurant" });
    }
}

const createMyRestuarant = async ( req: Request, res: Response ) => {
    try {
        const existingRestaurants = await Restaurant.findOne( { user: req.userId});

        if(existingRestaurants){
            return res
            .status(409)
            .json({ message: "User restaurant already exists" });
        }

        const image = req.file as Express.Multer.File;
        const base64Image = Buffer.from(image.buffer).toString("base64");
        const dataURL = `data:${image.mimetype};base64,${base64Image}`;

        const uploadResponse = await cloudinary.v2.uploader.upload(dataURL); //give back an api response

        const restaurant = new Restaurant(req.body);
        restaurant.imageUrl = uploadResponse.url;
        restaurant.user = new mongoose.Types.ObjectId(req.userId);
        restaurant.lastUpdated = new Date();
        await restaurant.save();

        res.status(201).send(restaurant);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export default {
  createMyRestuarant,
  getMyRestaurant,
};
