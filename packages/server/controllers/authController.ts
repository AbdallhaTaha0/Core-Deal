import type { Request, Response, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import type { Types } from "mongoose";

import User from "../models/user";

interface AuthErrors {
  name: string;
  email: string;
  password: string;
  [key: string]: string;
}

const handleErrors = (err: any): AuthErrors => {
  let errors: AuthErrors = {
    name: "",
    email: "",
    password: "",
  };

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "that email is not registered";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "that password is incorrect";
  }

  // Handle duplication error with code 11000
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }
  // handle validation errors
  if (err.message && err.message.includes("User validation failed") && err.errors) {
    Object.values(err.errors).forEach((error: any) => {
      if (error.properties && error.properties.path) {
        const key = error.properties.path;
        errors[key] = error.properties.message;
      }
    });
  }

  return errors;
};

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id: Types.ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "super_secret_key", {
    expiresIn: maxAge,
  });
};
const signup_post: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, phone, address, role } = req.body;
  try {
    const newUser = await User.create({ name, email, password, phone, address, role });
    const token = createToken(newUser._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: newUser._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const login_post: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

export default { login_post, signup_post };
