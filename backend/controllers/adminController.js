const adminController = require("express").Router()
const User = require("../models/User")
const Blog = require("../models/Blog")
//const verifyToken = require('../middlewares/verifyToken')

adminController.get('/getAllUser', async(req, res)=>{
    try {
        const users = await User.find({})
       
        return res.status(500).json(users)
    } catch (error) {
        return res.status(500).json(error)
    }
})

adminController.get('/viewpost/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        
        const blogs = await Blog.find({ userId: req.params.id });
        return res.status(200).json([blogs]);
    } catch (error) {
        return res.status(500).json(error)
    }
})

adminController.put('/handleBlock/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      user.isBlocked = !user.isBlocked; // Toggle the isBlocked status
      await user.save(); // Save the updated user
      return res.status(200).json(user.isBlocked);
    } catch (error) {
      return res.status(500).json(error);
    }
  });
  





module.exports = adminController;
