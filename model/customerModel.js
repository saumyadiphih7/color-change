import mongoose from "mongoose";


const customerSchema = mongoose.Schema({
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

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;