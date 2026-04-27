import type { Request, Response } from "express";

import User from "../models/user";

const handleErrors = (err: any) => {
  let errors = {
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
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }: any) => {
      const key: "name" | "email" | "password" = properties.path;
      errors[key] = properties.message;
    });
  }

  return errors;
};

const signup_post = async (req: Request, res: Response) => {
  const { name, email, password, phone, address, role } = req.body;
  try {
    const newUser = await User.create({ name, email, password, phone, address, role });
    res.status(200).send(newUser);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const login_post = async (req: Request, res: Response) => {
  res.send("logged in");
};

export default { login_post, signup_post };
