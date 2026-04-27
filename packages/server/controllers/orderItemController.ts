import type { Request, Response } from "express";
import OrderItem from '../models/orderItem';

const getAllOrderItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderItems = await OrderItem.find().sort({ createdAt: -1 });
    res.status(200).json(orderItems);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order items", error });
  }
};

const getSingleOrderItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderItem = await OrderItem.findById(req.params.id);
    if (!orderItem) {
      res.status(404).json({ message: "Order item not found" });
      return;
    }
    res.status(200).json(orderItem);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order item", error });
  }
};

const addOrderItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderItem = new OrderItem(req.body);
    const saved = await orderItem.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Failed to create order item", error });
  }
};

const updateOrderItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await OrderItem.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updated) {
      res.status(404).json({ message: "Order item not found" });
      return;
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: "Failed to update order item", error });
  }
};

const deleteOrderItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await OrderItem.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: "Order item not found" });
      return;
    }
    res.status(200).json({ message: "Order item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete order item", error });
  }
};

module.exports = {
  getAllOrderItems,
  getSingleOrderItem,
  addOrderItem,
  updateOrderItem,
  deleteOrderItem
};
