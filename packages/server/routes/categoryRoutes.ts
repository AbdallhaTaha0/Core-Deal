const express = require('express');
import type { Request, Response, Router } from "express";
import  categoryController from'../controllers/categoryController';

const router: Router = express.Router();

// /api/categories/
router.get("/", categoryController.getAllCategories); // get all categories

// /api/categories/:id
router.get("/:id", categoryController.getSingleCategory); // get single category

// /api/categories/
router.post("/", categoryController.addCategory); // create new category

// /api/categories/:id
router.put("/:id", categoryController.updateCategory); // update an exist category

// /api/categories/:id
router.delete("/:id", categoryController.deleteCategory); // delete exist category

export default router;
