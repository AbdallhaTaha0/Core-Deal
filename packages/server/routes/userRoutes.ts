
const express = require('express');
import type { Router } from "express";
import  userController  from  '../controllers/userController';

const router: Router = express.Router();

// /api/users/
router.get("/", userController.getAllUsers); // get all users

// /api/users/:id
router.get("/:id", userController.getSingleUser); // get single user

// /api/users/
router.post("/", userController.addUser); // create new user

// /api/users/:id
router.put("/:id", userController.updateUser); // update an exist user

// /api/users/:id
router.delete("/:id", userController.deleteUser); // delete exist user

export default router;