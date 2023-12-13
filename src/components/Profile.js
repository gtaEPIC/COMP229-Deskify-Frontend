// Profile.js
import React, { useEffect, useState } from 'react';
import { getUsername, promoteToAdmin } from '../pages/login-helper';
import './Profile.css';

function Profile() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [promoteUsername, setPromoteUsername] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user');
        const userData = await response.json();

        setIsAdmin(userData.isAdmin);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUserData();
  }, []);

  const username = getUsername();

  const handlePromoteClick = () => {
    promoteToAdmin(promoteUsername);
  };

  return (
    <div className="profile-container">
      <h2 className="profile-heading">User Profile</h2>

      <div className="user-info">
        <p className="info-text">Welcome, {username}!</p>
      </div>

      <p className="welcome-message">Welcome to your Profile!</p>

      {isAdmin && (
        <>
          <div className="admin-info">
            <p className="admin-text">As an admin, you have special privileges:</p>
            <ul className="admin-perks">
              <li>Create new admins</li>
              <li>Access admin-only features</li>
            </ul>
          </div>

          {/* Add a form or button for promoting another user to admin */}
          <div className="promote-admin-form">
            <input
              type="text"
              placeholder="Enter username to promote"
              value={promoteUsername}
              onChange={(e) => setPromoteUsername(e.target.value)}
            />
            <button onClick={handlePromoteClick}>Promote to Admin</button>
          </div>
        </>
      )}

      {!isAdmin && (
        <p className="admin-intro">
          Let us introduce you to the admin! Admins have special powers to make other users admins.
        </p>
      )}
    </div>
  );
}

export default Profile;
