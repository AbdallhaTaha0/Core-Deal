import type { Request, Response, RequestHandler } from "express";
import Category from '../models/category';

const getAllCategories: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, message: "Categories fetched successfully", data: { categories } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: "Failed to fetch categories", error });
  }
};

const getSingleCategory: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(404).json({ success: false, message: "Category not found" });
      return;
    }
    res.status(200).json({ success: true, message: "Category fetched successfully", data: { category } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: "Failed to fetch category", error });
  }
};

const addCategory: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = new Category(req.body);
    const saved = await category.save();
    res.status(201).json({ success: true, message: "Category created successfully", data: { category: saved } });
  } catch (error: any) {
    res.status(400).json({ success: false, message: "Failed to create category", error });
  }
};

const updateCategory: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updated) {
      res.status(404).json({ success: false, message: "Category not found" });
      return;
    }
    res.status(200).json({ success: true, message: "Category updated successfully", data: { category: updated } });
  } catch (error: any) {
    res.status(400).json({ success: false, message: "Failed to update category", error });
  }
};

const deleteCategory: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ success: false, message: "Category not found" });
      return;
    }
    res.status(200).json({ success: true, message: "Category deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: "Failed to delete category", error });
  }
};

export default {
  getAllCategories,
  getSingleCategory,
  addCategory,
  updateCategory,
  deleteCategory
};
