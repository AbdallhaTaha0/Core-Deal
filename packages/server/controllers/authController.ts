import type { Request, Response, RequestHandler } from "express";

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

const signup_post: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, phone, address, role } = req.body;
  try {
    const newUser = await User.create({ name, email, password, phone, address, role });
    res.status(200).send(newUser);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const login_post: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  res.send("logged in");
};

export default { login_post, signup_post };
