import type { Request, Response, RequestHandler } from "express";
import Order from '../models/order';

const getAllOrders: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, message: "Orders fetched successfully", data: { orders } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: "Failed to fetch orders", error });
  }
};

const getSingleOrder: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404).json({ success: false, message: "Order not found" });
      return;
    }
    res.status(200).json({ success: true, message: "Order fetched successfully", data: { order } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: "Failed to fetch order", error });
  }
};

const addOrder: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = new Order(req.body);
    const saved = await order.save();
    res.status(201).json({ success: true, message: "Order created successfully", data: { order: saved } });
  } catch (error: any) {
    res.status(400).json({ success: false, message: "Failed to create order", error });
  }
};

const updateOrder: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updated) {
      res.status(404).json({ success: false, message: "Order not found" });
      return;
    }
    res.status(200).json({ success: true, message: "Order updated successfully", data: { order: updated } });
  } catch (error: any) {
    res.status(400).json({ success: false, message: "Failed to update order", error });
  }
};

const deleteOrder: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ success: false, message: "Order not found" });
      return;
    }
    res.status(200).json({ success: true, message: "Order deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: "Failed to delete order", error });
  }
};

export default {
  getAllOrders,
  getSingleOrder,
  addOrder,
  updateOrder,
  deleteOrder
};
