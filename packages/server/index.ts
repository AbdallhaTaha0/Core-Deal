import express from "express";
const morgan = require("morgan");
const mongoose = require("mongoose");
import type { Request, Response } from "express";

import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";
import orderItemRoutes from "./routes/orderItemRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import cartRoute from "./routes/cartRoute";

const app = express();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in .env");
}

mongoose.connect(MONGODB_URI).then(() => {
  app.listen(5000);
  console.log("Server is now listening to port:5000");
});

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Core Deal API",
  });
});
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/orderItems", orderItemRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/carts", cartRoute);


app.use((req: Request , res: Response)=>{
  res.status(404).json({
    success: false,
    message: `Page not found!`,
  });
})