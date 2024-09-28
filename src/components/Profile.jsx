// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/profile', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setProfileData(response.data);
        } catch (err) {
          setError('Failed to fetch profile data');
        }
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Profile</h2>
      {profileData ? (
        <div>
          <p>Username: {profileData.user.username}</p>
          <p>Role: {profileData.user.role}</p>
          <p>{profileData.message}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
