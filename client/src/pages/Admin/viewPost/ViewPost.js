import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { request } from '../../../utils/fetchApi.js';
import Navbar from '../navbar/navbar.jsx';
import './viewpost.css'

const ViewPost = () => {
  const [userBlogs, setUserBlogs] = useState([]);
  const { id } = useParams();
  const { token } = useSelector((state) => state.adminAuth);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const options = { headers: { 'Authorization': `Bearer ${token}` } };
        const data = await request(`/admin/viewpost/${id}`, 'GET', options);
        
        setUserBlogs(data); // Extract the blog object from the nested array
        
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlogDetails();
  }, [id, token]);


const handleBlockToggle = (arrayIndex, blogIndex) => {
    setUserBlogs((prevUserBlogs) => {
      const updatedUserBlogs = [...prevUserBlogs];
      updatedUserBlogs[arrayIndex][blogIndex].status = (updatedUserBlogs[arrayIndex][blogIndex].status === 'Blocked') ? 'Active' : 'Blocked';
      return updatedUserBlogs;
    });
  };

return (
  <div>
    <Navbar />
    <h1 className="view-post-heading">View Post</h1>
    <div className="card-container">
      {userBlogs.length === 0 ? (
        <p className="empty-posts">Empty Posts</p>
      ) : (
        userBlogs.map((array, arrayIndex) => (
          <div className="card-group" key={arrayIndex}>
            {array.map((blog, blogIndex) => (
              <div className="card" key={blog._id}>
                <img src={`http://localhost:5000/image/${blog?.photo}`} alt="" className="card-image" />
                <div className="card-content">
                  <h2 className="card-title">{blog.title}</h2>
                  <p className="card-description">{blog.desc}</p>
                  <button
                    className={`block-button ${blog.status === 'Blocked' ? 'blocked' : 'active'}`}
                    onClick={() => handleBlockToggle(arrayIndex, blogIndex)}
                  >
                    {blog.status === 'Blocked' ? 'Unblock' : 'Block'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  </div>
);

};


export default ViewPost;
