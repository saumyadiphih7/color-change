
import { changeAdminPanelTheme, changeCustomerPanelTheme, createAdmin, createCustomer, loginAdmin, logoutAdmin, showAdminPanel } from "../controller/adminController.js";


import express from "express";
import {verifyToken, isAdmin } from "../middleware/authMiddleware.js";


const AdminRoute = express.Router();

AdminRoute.post("/create", createAdmin)
AdminRoute.post("/add/customer",  verifyToken, isAdmin,createCustomer);
AdminRoute.post("/login",loginAdmin)
AdminRoute.post("/logout", verifyToken, isAdmin, logoutAdmin);
AdminRoute.get ("/show/admin", verifyToken, isAdmin, showAdminPanel);
AdminRoute.post("/change/admin/theme", verifyToken, isAdmin, changeAdminPanelTheme);
AdminRoute.post("/change/customer/theme", verifyToken, isAdmin, changeCustomerPanelTheme);


export default AdminRoute