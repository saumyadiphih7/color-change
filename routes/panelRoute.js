import express from "express";

import { changeAdminPanelTheme, changeCustomerPanelTheme, createPanel, showAdminPanel, showCustomerPanel } from "../controller/panelController.js";
import { isAdmin, verifyToken } from "../middleware/authMiddleware.js";



const panelRoute = express.Router();


panelRoute.post("/create", verifyToken,isAdmin, createPanel)
panelRoute.get("/show/adminpanel",  verifyToken,isAdmin, showAdminPanel);
panelRoute.get("/show/customerpanel", verifyToken,isAdmin, showCustomerPanel);
panelRoute.post("/adminpanel/change/theme", verifyToken,isAdmin, changeAdminPanelTheme);
panelRoute.post("/customerpanel/change/theme",  verifyToken,isAdmin, changeCustomerPanelTheme);

export default panelRoute;



