const authController = require('express').Router()
const User = require('../models/User')
const verifyToken = require('../middlewares/verifyToken')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


authController.post('/register', async (req,res)=>{
    // console.log("hhhhhhhhhhhhh");
    try {
        const isExisting = await User.findOne({email: req.body.email})
        if(isExisting){
            throw new Error("Already such an account. Try a different email")
        }

        const hashPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = await User.create({...req.body, password:hashPassword})
        const {password, ...others} = newUser._doc
        const token = jwt.sign({id: newUser._id},process.env.JWT_SECRET,{expiresIn: '5h'})
        // console.log(token,"vvvvvvvvvvvvvvvvv");
        return res.status(201).json({user:others, token})

    } catch (error) {
        return res.status(500).json(error)
    }
})

authController.post('/login', async(req,res)=>{
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user){
            throw new Error("Invalid credentials")
        }
        if (user.isBlocked) {
           
            return res.status(403).json({ message: "Your account is blocked. Please contact the administrator." });
          }
        const comparePass = await bcrypt.compare(req.body.password, user.password)
        if(!comparePass){
            throw new Error("Invalid credentials")
        }

        const {password, ...others} = user._doc
        const token = jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:'5h'})
        return res.status(200).json({user:others, token})
    } catch (error) {
        return res.status(500).json(error)
    }
})


authController.post('/logout', async (req, res) => {
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
module.exports = authController