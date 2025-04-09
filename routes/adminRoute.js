
import { createAdmin, createCustomer, loginAdmin, logoutAdmin } from "../controller/adminController.js";


import express from "express";
import {verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const AdminRoute = express.Router();

AdminRoute.post("/create", createAdmin)
AdminRoute.post("/add/customer",  verifyToken, isAdmin,createCustomer);
AdminRoute.post("/login",loginAdmin)
AdminRoute.post("/logout", verifyToken, isAdmin,logoutAdmin);


export default AdminRoute