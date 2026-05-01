import type { Request, Response, RequestHandler } from "express";
import User from '../models/user';

const getAllUsers: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: "Failed to fetch users", error });
  }
};

const getSingleUser: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: "Failed to fetch user", error });
  }
};

const addUser: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = new User(req.body);
    const saved = await user.save();
    res.status(201).json(saved);
  } catch (error: any) {
    res.status(400).json({ message: "Failed to create user", error });
  }
};

const updateUser: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updated) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(updated);
  } catch (error: any) {
    res.status(400).json({ message: "Failed to update user", error });
  }
};

const deleteUser: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Failed to delete user", error });
  }
};

export default {
  getAllUsers,
  getSingleUser,
  addUser,
  updateUser,
  deleteUser
};