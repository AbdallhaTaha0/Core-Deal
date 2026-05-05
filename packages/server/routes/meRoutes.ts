const express = require('express');
import type { Router } from "express";
import  meController from'../controllers/meController';

const router: Router = express.Router();

// /api/categories/
router.get("/", meController.getMe); // get all categories

// /api/categories/:id
router.patch("/", meController.updateMe); // get single category

export default router;
