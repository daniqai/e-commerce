import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomerList.css'; // You will create a CSS file to style this page

const CustomerList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  // Handle sign out: clear token and navigate to login page
  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="customer-list-container">
      {/* Sign Out Button */}
      <div className="header">
        <button className="signout-button" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>

      <h1>Customer List</h1>
      {/* Customer Table */}
      {users.length > 0 ? (
        <table className="customer-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No customers found.</p>
      )}
    </div>
  );
};

export default CustomerList;
