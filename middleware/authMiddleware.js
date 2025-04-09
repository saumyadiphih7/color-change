import Admin from "../model/adminModel.js";
import jwt from "jsonwebtoken";

const isAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  }
  catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}


const verifyToken = async (req, res, next) => { 
  let token
  token = req.headers.authorization || req.headers.Authorization
  
  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }
  try {
    token = token.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}
 

export { verifyToken, isAdmin}