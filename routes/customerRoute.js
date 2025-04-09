import {
  customerLogin,
  logoutCustomer,
} from "../controller/customerController.js";
import {verifyToken, isCustomer } from "../middleware/authMiddleware.js";
import Customer from "../model/customerModel";

import express from "express";

const customerRoute = express.Router();

customerRoute.post("/login", customerLogin);
customerRoute.post("/logout",verifyToken, isCustomer, logoutCustomer);

export default customerRoute


