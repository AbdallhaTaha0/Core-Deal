import type { Request, Response } from "express";

const login_post = (req: Request, res: Response) => {
  res.send("logged in");
};
const signup_post = (req: Request, res: Response) => {
  res.send("signed up");
};

export default { login_post, signup_post };
