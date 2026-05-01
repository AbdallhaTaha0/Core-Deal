import type { Request, Response, RequestHandler } from "express";
import OrderItem from '../models/orderItem';

const getAllOrderItems: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderItems = await OrderItem.find().sort({ createdAt: -1 });
    res.status(200).json(orderItems);
  } catch (error: any) {
    res.status(500).json({ message: "Failed to fetch order items", error });
  }
};

const getSingleOrderItem: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderItem = await OrderItem.findById(req.params.id);
    if (!orderItem) {
      res.status(404).json({ message: "Order item not found" });
      return;
    }
    res.status(200).json(orderItem);
  } catch (error: any) {
    res.status(500).json({ message: "Failed to fetch order item", error });
  }
};

const addOrderItem: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderItem = new OrderItem(req.body);
    const saved = await orderItem.save();
    res.status(201).json(saved);
  } catch (error: any) {
    res.status(400).json({ message: "Failed to create order item", error });
  }
};

const updateOrderItem: RequestHandler = async (req: Request, res: Response): Promise<void> => {
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
  } catch (error: any) {
    res.status(400).json({ message: "Failed to update order item", error });
  }
};

const deleteOrderItem: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await OrderItem.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: "Order item not found" });
      return;
    }
    res.status(200).json({ message: "Order item deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Failed to delete order item", error });
  }
};

export default {
  getAllOrderItems,
  getSingleOrderItem,
  addOrderItem,
  updateOrderItem,
  deleteOrderItem
};
