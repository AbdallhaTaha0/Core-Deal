import express from "express";
const morgan = require("morgan");
const mongoose = require("mongoose");
import type { Request, Response } from "express";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";
import orderItemRoutes from "./routes/orderItemRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import cartRoute from "./routes/cartRoute";
import authRoutes from "./routes/authRoutes";
import requireAuth, { requireRole } from "./middleware/authMiddleware";  

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
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Core Deal API",
  });
});
app.use(authRoutes);

// Admin only routes
app.use("/api/users", requireAuth, requireRole(["admin"]), userRoutes);

// Routes accessible by both admin and customer
app.use("/api/products", requireAuth, requireRole(["admin", "customer"]), productRoutes);
app.use("/api/orders", requireAuth, requireRole(["admin", "customer"]), orderRoutes);
app.use("/api/orderItems", requireAuth, requireRole(["admin", "customer"]), orderItemRoutes);
app.use("/api/categories", requireAuth, requireRole(["admin", "customer"]), categoryRoutes);
app.use("/api/carts", requireAuth, requireRole(["admin", "customer"]), cartRoute);



app.use((req: Request , res: Response)=>{
  res.status(404).json({
    success: false,
    message: `Page not found!`,
  });
})