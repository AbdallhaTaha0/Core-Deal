const express = require('express');
import type { Request, Response, Router } from "express";
const orderController = require('../controllers/orderController');

const router: Router = express.Router();

// /api/orders/
router.get("/", orderController.getAllOrders); // get all orders

// /api/orders/:id
router.get("/:id", orderController.getSingleOrder); // get single order

// /api/orders/
router.post("/", orderController.addOrder); // create new order

// /api/orders/:id
router.put("/:id", orderController.updateOrder); // update an exist order

// /api/orders/:id
router.delete("/:id", orderController.deleteOrder); // delete exist order

export default router;
