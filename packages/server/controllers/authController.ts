import type { Request, Response, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { omitUndefined, type Types } from "mongoose";

import User from "../models/user";
import type { UserType } from "../models/user";

type SafeUser = Omit<UserType, "password"> & { _id : Types.ObjectId | string };


interface AuthErrors {
  name: string;
  email: string;
  password: string;
  [key: string]: string;
}

type dataResponse = {
  user : SafeUser;
}

type responseType = {
  success: boolean;
  message: string;
  data: dataResponse;
}

const createResponse = (SafeUser : SafeUser, message : string): responseType => {
  return {
    success: true,
    message,
    data: {
      user : SafeUser,
    }
  }
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
    res.status(201).json(createResponse({_id: newUser._id, name, email, phone, address, role,updatedAt: newUser.updatedAt, createdAt: newUser.createdAt}, "User created successfully"));
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const login_post: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const {  email, password} = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 }); 
    const {_id, name, phone, address, role,updatedAt,createdAt} = user;
    res.status(200).json(createResponse({_id, name,email, phone, address, role,updatedAt,createdAt}, "User logged in successfully"));
  } catch (err : any) {
    const errors = handleErrors(err);
    res.status(400).json({ errors});
  }
};

const logout_post: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  if (req.cookies?.jwt) {
    res.cookie("jwt", "", { httpOnly: true, maxAge: 1 });
    res.status(200).json({ message: "Logout successfully" });
  } else {
    res.status(400).json({ message: "There is no user to log out." });
  }
};

export default { login_post, signup_post, logout_post };
