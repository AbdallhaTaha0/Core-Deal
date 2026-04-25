import type { Request, Response } from "express";
const Cart = require('../models/cart');

const getAllCarts = async (req: Request, res: Response): Promise<void> => {
  try {
    const carts = await Cart.find().sort({ createdAt: -1 });
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch carts", error });
  }
};

const getSingleCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
      return;
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cart", error });
  }
};

const addCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const cart = new Cart(req.body);
    const saved = await cart.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Failed to create cart", error });
  }
};

const updateCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updated) {
      res.status(404).json({ message: "Cart not found" });
      return;
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: "Failed to update cart", error });
  }
};

const deleteCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Cart.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: "Cart not found" });
      return;
    }
    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete cart", error });
  }
};

module.exports = {
  getAllCarts,
  getSingleCart,
  addCart,
  updateCart,
  deleteCart
};
