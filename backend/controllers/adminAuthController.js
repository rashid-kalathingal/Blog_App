const adminAuthController = require('express').Router()
const Admin = require('../models/Admin')
const verifyToken = require('../middlewares/verifyToken')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


adminAuthController.post('/register', async (req,res)=>{
    try {
        const isExisting = await Admin.findOne({email: req.body.email})
        if(isExisting){
            throw new Error("Already such an account. Try a different email")
        }
        const hashPassword = await bcrypt.hash(req.body.password, 10)
        const newAdmin = await Admin.create({...req.body, password:hashPassword})
        const {password, ...others} = newAdmin._doc
        const token = jwt.sign({id: newAdmin._id},process.env.JWT_ADMINSECRET,{expiresIn: '5h'})
        return res.status(201).json({admin:others, token})
    } catch (error) {
        return res.status(500).json(error)
    }
})

adminAuthController.post('/login', async(req,res)=>{
    try {
        const admin = await Admin.findOne({email: req.body.email})
        if(!admin){
            throw new Error("Invalid credentials")
        }
        const comparePass = await bcrypt.compare(req.body.password, admin.password)
        if(!comparePass){
            throw new Error("Invalid credentials")
        }

        const {password, ...others} = admin._doc
        const token = jwt.sign({id:admin.id},process.env.JWT_ADMINSECRET,{expiresIn:'5h'})
        return res.status(200).json({admin:others, token})
    } catch (error) {
        return res.status(500).json(error)
    }
})


adminAuthController.post('/logout', async (req, res) => {
    try {
      // Extract the token from the request header or body
      const token = req.headers.authorization?.split(' ')[1] || req.body.token;
      
      // Add the token to the blacklist
      tokenBlacklist.add(token);
      
      // Perform any additional logout actions (e.g., clear session data)
  
      return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      return res.status(500).json(error);
    }
  });
module.exports = adminAuthController