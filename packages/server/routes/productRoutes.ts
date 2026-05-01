const express = require('express');
import type { Request, Response, Router } from "express";
import productController from '../controllers/productController';

const router: Router = express.Router();

// /api/products/
router.get("/", productController.getAllProducts); // get all products

// /api/products/:id
router.get("/:id", productController.getSingleProduct); // get single product

// /api/products/
router.post("/", productController.addProduct); // create new product

// /api/products/:id
router.put("/:id", productController.updateProduct); // update an exist product

// /api/products/:id
router.delete("/:id", productController.deleteProduct); // delete exist product

export default router;
