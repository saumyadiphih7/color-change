import Customer from "../model/customerModel.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const customerLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  const customer = await Customer.findOne({ email });
  if (!customer) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  const isMatch = await bcrypt.compare(password, customer.password);
  if(!isMatch){
    res.status(401);
    throw new Error("Invalid email or password");
  }
  const token = jwt.sign({ id: customer._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("customerToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
   
  })

  res.status(200).json({
    _id: customer._id,
    name: customer.name,
    email: customer.email,
    backgroundColor: customer.backgroundColor,
    textColor: customer.textColor,
    token,
  });
});


const logoutCustomer = asyncHandler(async (req, res) => {

  res.clearCookie("customerToken");
  res.status(200).json({ message: "Logout successful" });

 });

export { customerLogin, logoutCustomer };