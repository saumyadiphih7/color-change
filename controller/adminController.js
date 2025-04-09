import Admin from "../model/adminModel.js";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import Customer from "../model/customerModel.js";

const createAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  const existedEmail = await Admin.findOne({ email });
  if (existedEmail) {
    res.status(400);
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = await Admin.create({
    name,
    email,
    password: hashedPassword,
  });

  if (admin) {
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
    });
  } else {
    res.status(400);
    throw new Error("Admin cannot be created");
  }
});


const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  const admin = await Admin.findOne({ email });
    if (!admin) {
      res.status(401);
      throw new Error(" admin not found");
    }

  const isPasswordMatched = await bcrypt.compare(password, admin.password);
  if (!isPasswordMatched) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
  });

  if(!token){
    res.status(401);
    throw new Error("Token not generated");
  }
  res.status(200).json({
    _id: admin._id,
    name: admin.name,
    email: admin.email,
    backgroundColor: admin.backgroundColor,
    textColor: admin.textColor,
    token,
  });

})

const logoutAdmin = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
});

const createCustomer = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  const existedEmail = await Customer.findOne({ email });
  if (existedEmail) {
    res.status(400);
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const customer = await Customer.create({
    name,
    email,
    password: hashedPassword,
  });

  if (customer) {
    res.status(201).json({
      _id: customer._id,
      name: customer.name,
      email: customer.email,
    });
  }
  else {
    res.status(400);
    throw new Error("Customer cannot be created");
  }
});



const showAdminPanel = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.user.id).select("-password");
  if (!admin) {
    res.status(404);
    throw new Error("Admin not found");
  }

  res.status(200).json({
    _id: admin._id,
    name: admin.name,
    email: admin.email,
    backgroundColor: admin.backgroundColor,
    textColor: admin.textColor,
  });
});

const changeAdminPanelTheme = asyncHandler(async (req, res) => {

  const { backgroundColor, textColor } = req.body;
   
  if (!backgroundColor || !textColor) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  const admin = await Admin.findById(req.user.id).select("-password");
  if (!admin) {
    res.status(404);
    throw new Error("Admin not found");
  }
  admin.backgroundColor = backgroundColor;
  admin.textColor = textColor;

  const updatedAdmin = await admin.save();
  res.status(200).json({
    _id: updatedAdmin._id,
    name: updatedAdmin.name,
    email: updatedAdmin.email,
    backgroundColor: updatedAdmin.backgroundColor,
    textColor: updatedAdmin.textColor,
  });
});

const changeCustomerPanelTheme = asyncHandler(async (req, res) => {
  const { backgroundColor, textColor } = req.body;

  if (!backgroundColor || !textColor) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  const result = await Customer.updateMany({}, { backgroundColor, textColor });

  if (result.modifiedCount === 0) {
    res.status(404);
    throw new Error("No customers were updated");
  }

  res.status(200).json({
    status: "success",
    message: "Customer panel theme changed successfully",
    // modifiedCount: result.modifiedCount,
  });
});



  

export { createAdmin, loginAdmin, createCustomer, logoutAdmin, showAdminPanel , changeAdminPanelTheme ,changeCustomerPanelTheme};

