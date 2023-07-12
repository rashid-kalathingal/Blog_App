import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'
import AdminHome from './pages/Admin/home/Home'
import AdminLogin from './pages/Admin/login/Login';
import AdminRegister from './pages/Admin/register/Register';
import ViewPost from './pages/Admin/viewPost/ViewPost';
import Home from './pages/home/home';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Create from './pages/create/create';
import BlogDetails from './pages/blogDetails/blogDetails';
import UpdateBlog from './pages/updateBlog/updateBlog';
 import { useSelector } from 'react-redux';


function App() {
   const { user } = useSelector((state) => state.auth)
   const { admin } = useSelector((state)=>state.adminAuth)
  return (
    <div >



         <Routes>
        <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
        <Route path='/register' element={!user ? <Register /> : <Navigate to='/' />} />
        <Route path='/create' element={user ? <Create /> : <Navigate to='/login' />} />
        <Route path='/blogDetails/:id' element={user ? <BlogDetails /> : <Navigate to='/login' />} />
        <Route path='/updateBlog/:id' element={user ? <UpdateBlog /> : <Navigate to='/login' />} />

        <Route path="/admin" element={admin ? <AdminHome/> : <Navigate to='/admin/login' /> }/>
        <Route path="/admin/login" element={<AdminLogin/>}/>
        <Route path="/admin/register" element={<AdminRegister/>}/>
        <Route path="/admin/viewpost/:id" element={<ViewPost/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
