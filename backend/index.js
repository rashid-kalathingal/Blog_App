const express = require('express')
const mongoose = require("mongoose")
const dotenv = require('dotenv').config()
const cors = require('cors')
 const authController = require('./controllers/authController')
 const blogController = require('./controllers/blogController')
 const adminAuthController =require('./controllers/adminAuthController')
  const  adminController = require('./controllers/adminController')
const multer = require('multer')
const app = express()

//connect db
//connect server
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB has been started successfully')
    // Start the server after successful database connection
    app.listen(process.env.PORT, () => {
      console.log('Server has been started successfully')
    })
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error)
  })


  //routes
 app.use('/image', express.static('public/images'))

 app.use(cors())
 app.use(express.json())
 app.use(express.urlencoded({extended:true}))
 app.use('/auth',authController)
 app.use('/adminAuth',adminAuthController)
 app.use('/blog',blogController)
 app.use('/admin',adminController)


// multer
const storage = multer.diskStorage({
  destination: function(req, file, cb){
      cb(null, 'public/images')
  },
  filename: function(req, file, cb){
      cb(null, req.body.filename)
  }
})

const upload = multer({
  storage: storage
})

app.post('/upload', upload.single("image"), async(req, res) => {
  return res.status(200).json({msg: "Successfully uploaded"})
})
