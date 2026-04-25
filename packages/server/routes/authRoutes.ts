import Router from "express";
import type { Router as RouterType } from "express";
import authController from "../controllers/authController";

const router: RouterType = Router();

router.post('/login', authController.login_post);
router.post('/signup', authController.signup_post);

export default router;