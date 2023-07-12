import React,{useState} from 'react'
import classes from './navbar.module.css'
import { Link } from 'react-router-dom'
import womanImg from '../../../assets/aaa.JPG'
import { useDispatch } from 'react-redux'
import { logout } from '../../../redux/adminAuthSlice'

const Navbar = () => {
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch();
  const handleLogout = () => {
    
    dispatch(logout());
    // Perform any additional logout-related tasks if needed
  };
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <Link to='/admin'>blogd. Admin </Link>
        </div>
        <ul className={classes.center}>
          <li className={classes.listItem}>Home</li>
          <li className={classes.listItem}>About</li>
          <li className={classes.listItem}>Contacts</li>
          <li className={classes.listItem}>Categories</li>
        </ul>
        <div className={classes.right}>
          <img onClick={() => setShowModal(prev => !prev)} alt='' src={womanImg} className={classes.img} />
          {showModal && (
            <div className={classes.modal}>
              <span onClick={handleLogout} >Logout</span>
            </div>
         )}
            <>
              <span>Hello admin</span>
            </>
          
        </div>
      </div>
    </div>
  )
}

export default Navbar