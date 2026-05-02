import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";

export interface RequestAuth extends Request {
  user?: any;
}

const requireAuth = (req: RequestAuth, res: Response, next: NextFunction): void => {
  const token = req.cookies?.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(
      token,
      process.env.JWT_SECRET || "super_secret_key",
      async (err: jwt.VerifyErrors | null, decodedToken: any) => {
        if (err) {
          console.error("JWT verification failed:", err.message);
          res.status(401).json({ message: "Unauthorized" });
        } else {
          try {
            const user = await User.findById(decodedToken.id).select("-password");
            if (!user) {
              res.status(401).json({ message: "Unauthorized" });
              return;
            }
            req.user = user;
            next();
          } catch (error) {
            console.error("Error fetching user:", error);
            res.status(500).json({ message: "Internal server error" });
          }
        }
      }
    );
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export const requireRole = (roles: string[]) => {
  return (req: RequestAuth, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({ message: "Forbidden: You don't have enough permissions" });
      return;
    }

    next();
  };
};

export default requireAuth;