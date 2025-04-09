import mongoose from "mongoose";


const adminSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    
  },
  password: {
    type: String,
    required: true,
  },
  backgroundColor: {
    type: String,
    required: true,
    default: "#ffffff",
  },
  textColor: {
    type: String,
    required: true,
    default: "#000000",
  },

  
}, {
  timestamps: true,

})

const Admin = mongoose.model("Admin", adminSchema)
export default Admin