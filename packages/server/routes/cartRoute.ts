const express = require('express');
import type { Request, Response, Router } from "express";
const cartController = require('../controllers/cartController');

const router: Router = express.Router();

// /api/carts/
router.get("/", cartController.getAllCarts); // get all carts

// /api/carts/:id
router.get("/:id", cartController.getSingleCart); // get single cart

// /api/carts/
router.post("/", cartController.addCart); // create new cart

// /api/carts/:id
router.put("/:id", cartController.updateCart); // update an exist cart

// /api/carts/:id
router.delete("/:id", cartController.deleteCart); // delete exist cart

export default router;
