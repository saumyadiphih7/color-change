import Admin from '../model/adminModel.js';
import Customer from '../model/customerModel.js';
import Panel from '../model/panelModel.js';
import asyncHandler from 'express-async-handler';



const createPanel = asyncHandler(async (req, res) => {
  const { panelName,username, backgroundColor, textColor } = req.body;

  if(!panelName || !username ) {
    res.status(400);
    throw new Error('Please fill PanelName and Username');
  }

  const panel = await Panel.create({
    panelName,
    username:username.toLowerCase(),
    backgroundColor,
    textColor,
  });

  if (panel) {
    res.status(201).json({
      _id: panel._id,
      panelName: panel.panelName,
      username: panel.username,
      backgroundColor: panel.backgroundColor,
      textColor: panel.textColor,
    });
  }
  else {
    res.status(400);
    throw new Error('Invalid panel data');
  }
});

const showAdminPanel = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.user.id).select("-password");
  if (!admin) {
    res.status(404);
    throw new Error('Admin not found');
  }
  const panel = await Panel.findOne({ panelName: 'AdminPanel',username: admin.name.toLowerCase() });

  if (panel) {
    res.status(200).json({
      _id: panel._id,
      panelName: panel.panelName,
      adminName: admin.name,
      adminEmail: admin.email,
      backgroundColor: panel.backgroundColor,
      textColor: panel.textColor,
      
    });
  }
  else {
    res.status(404);
    throw new Error('Panel not found');
  }

})

const showCustomerPanel = asyncHandler(async (req, res) => {
  const { customerName } = req.body;
   if (!customerName) {
     res.status(400);
     throw new Error("Enter customer name");
   }
  const panel = await Panel.findOne({ panelName: 'CustomerPanel', username: customerName.toLowerCase() });
 
 
  const customer = await Customer.findOne({ name: customerName }).select('-password');
  console.log(customer);
  if(!customer) {
    res.status(404);
    throw new Error('Customer not found');
  }
  if (panel) {
    res.status(200).json({
      _id: panel._id,
      panelName: panel.panelName,
      customerName: customer.name,
      customerEmail: customer.email,
      backgroundColor: panel.backgroundColor,
      textColor: panel.textColor,
    });
  }
  else {
    res.status(404);
    throw new Error('Panel not found');
  }
});


const changeAdminPanelTheme = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.user.id).select("-password");
  if (!admin) {
    res.status(404);
    throw new Error('Admin not found');
  }
  const { backgroundColor, textColor } = req.body;
  const panel = await Panel.findOne({ panelName: 'AdminPanel' ,username: admin.name.toLowerCase() });

  if (panel) {
    panel.backgroundColor = backgroundColor || panel.backgroundColor;
    panel.textColor = textColor || panel.textColor;

    const updatedPanel = await panel.save();
    res.status(200).json({
      _id: updatedPanel._id,
      panelName: updatedPanel.panelName,
      adminName: updatedPanel.username,
     
      backgroundColor: updatedPanel.backgroundColor,
      textColor: updatedPanel.textColor,
    });
  }
  else {
    res.status(404);
    throw new Error('Panel not found');
  }
}
);

const changeCustomerPanelTheme = asyncHandler(async (req, res) => {
  const { customerName } = req.body;
   if (!customerName) {
     res.status(400);
     throw new Error("Enter customer name");
   }
  const { backgroundColor, textColor } = req.body;
 
  const panel = await Panel.findOne({
    panelName: "CustomerPanel",
    username: customerName.toLowerCase(),
  });

  if (panel) {
    panel.backgroundColor = backgroundColor || panel.backgroundColor;
    panel.textColor = textColor || panel.textColor;

    const updatedPanel = await panel.save();
    res.status(200).json({
      _id: updatedPanel._id,
      panelName: updatedPanel.panelName,
      customerName: updatedPanel.username,

      backgroundColor: updatedPanel.backgroundColor,
      textColor: updatedPanel.textColor,
    });
  }
  else {
    res.status(404);
    throw new Error('Panel not found');
  }
}
);
// Exporting the functions to be used in the routes 



export { createPanel, showAdminPanel, showCustomerPanel, changeAdminPanelTheme, changeCustomerPanelTheme };