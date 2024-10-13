import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";
import { v2 as cloudinary } from "cloudinary";


console.log(
  "MongoDB Connection String:",
  process.env.MONGODB_CONNECTION_STRING
);


mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to database!"));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

  

const app = express();
app.use(express.json());
app.use(cors());

// app.get("/test", async (req: Request, res: Response) => {
//     res.json({ message: "Hello!"})
// }); test point needed in the beginning

app.get("/health", async (req: Request, res: Response) => {
  res.json({ message: "health OK!"})
})// basic endpoint to check if the server has successfully started

app.use("/api/my/user", myUserRoute);
// it tells Express to send any requests starting with /api/my/user 
// to the myUserRoute, which will handle the request with the right logic and database actions.

app.listen(7001, () => {
    console.log("server started on localhost:7001");
});