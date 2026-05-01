import type { Request, Response, RequestHandler } from "express";
import Product from '../models/product';

const getAllProducts: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ message: "Failed to fetch products", error });
  }
};

const getSingleProduct: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json(product);
  } catch (error: any) {
    res.status(500).json({ message: "Failed to fetch product", error });
  }
};

const addProduct: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (error: any) {
    res.status(400).json({ message: "Failed to create product", error });
  }
};

const updateProduct: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updated) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json(updated);
  } catch (error: any) {
    res.status(400).json({ message: "Failed to update product", error });
  }
};

const deleteProduct: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Failed to delete product", error });
  }
};

export default {
  getAllProducts,
  getSingleProduct,
  addProduct,
  updateProduct,
  deleteProduct
};
