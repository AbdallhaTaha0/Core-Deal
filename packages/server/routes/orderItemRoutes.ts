const express = require('express');
import type { Router } from "express";
const orderItemController = require('../controllers/orderItemController');

const router: Router = express.Router();

// /api/orderItems/
router.get("/", orderItemController.getAllOrderItems); // get all order items

// /api/orderItems/:id
router.get("/:id", orderItemController.getSingleOrderItem); // get single order item

// /api/orderItems/
router.post("/", orderItemController.addOrderItem); // create new order item

// /api/orderItems/:id
router.put("/:id", orderItemController.updateOrderItem); // update an exist order item

// /api/orderItems/:id
router.delete("/:id", orderItemController.deleteOrderItem); // delete exist order item

export default router;
