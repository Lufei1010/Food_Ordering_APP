import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

console.log(
  "MongoDB Connection String:",
  process.env.MONGODB_CONNECTION_STRING
);


mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to database!"));
  

const app = express();
app.use(express.json());
app.use(cors());

app.get("/test", async (req: Request, res: Response) => {
    res.json({ message: "Hello!"})
});

app.listen(7001, () => {
    console.log("server started on localhost:7001");
});