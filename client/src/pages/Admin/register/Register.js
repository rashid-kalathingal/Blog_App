import React from 'react'
import classes from './register.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { request } from '../../../utils/fetchApi'
 import { register } from '../../../redux/adminAuthSlice'
 import {useDispatch} from 'react-redux'


const AdminRegister = () => {
 const [adminname, setAdminname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
   const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleRegister = async (e) => {
     e.preventDefault()

     if(adminname === '' || email === '' || password === '') return

    try {
      const options = {'Content-Type': 'application/json'}

      const data = await request('/adminAuth/register', "POST", options, {adminname, email, password})
      console.log('====================================');
      console.log(data,'hh');
      console.log('====================================');
      dispatch(register(data))
      navigate("/admin")
    } catch (error) {
       console.error(error)
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Admin Register</h2>
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Username..." onChange={(e) => setAdminname(e.target.value)}/>
          <input type="email" placeholder="Email..." onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder="Password..." onChange={(e) => setPassword(e.target.value)}/>
          <button type="submit">Register</button>
          <p>Already have an account? <Link to='/admin/login'>Login</Link></p>
        </form>
      </div>
    </div>
  )
}

export default AdminRegister
