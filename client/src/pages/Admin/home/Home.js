import React, { useEffect, useState } from 'react';
import './home.module.css'
import {  useNavigate } from 'react-router-dom'
import Navbar from '../navbar/navbar.jsx'
import { request } from '../../../utils/fetchApi'
import { Link } from 'react-router-dom'

const AdminHome = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await request('/admin/getAllUser', 'GET')
        setUsers(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchUsers()
  }, [])
 

  const handleBlockToggle = async (id) => {
    try {
      const updatedStatus = await request(`/admin/handleBlock/${id}`, "PUT");
      setUsers((prevUsers) => {
        const updatedUsers = prevUsers.map((user) => {
          if (user._id === id) {
            return {
              ...user,
              isBlocked: updatedStatus,
            };
          }
          return user;
        });
        return updatedUsers;
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  
  return (
    <>
      <Navbar />
  
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Mail ID</th>
              <th>Status</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.isBlocked ? 'Blocked' : 'Active'}</td>
                <td>
                  <button
                    className={`button ${user.isBlocked ? 'button-block' : 'button-unblock'}`}
                    onClick={() => handleBlockToggle(user._id)}
                  >
                    {user.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                  <button className="button button-view">
                    <Link to={`/admin/viewpost/${user._id}`}>View Post</Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
  
  
  
};

export default AdminHome;
