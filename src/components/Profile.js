// Profile.js
import React, { useEffect, useState } from 'react';
import {getIsAdmin, getUsername} from '../pages/login-helper';
import './Profile.css';
import UserModel from "./UserModel";
import FailAlertMessage from "./FailAlertMessage";
import {useLocation, useNavigate} from "react-router-dom";
import Button from "bootstrap/js/src/button";
let apiURL = process.env.REACT_APP_APIURL || 'http://localhost:3000'

function Profile() {
  const [profile, setProfile] = useState(new UserModel());
  const [changePassword, setChangePassword] = useState(false);

  const [adminUsername, setAdminUsername] = useState('');

  // Error handling
    const [error, setError] = useState(null);

    const { state } = useLocation();
    const { from } = state || { from: { pathname: '/' } };

    const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(apiURL + '/users/' + getUsername());
        const userData = await response.json();

        setProfile(userData.user)
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUserData().then();
  }, []);

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await fetch(apiURL + '/users/' + getUsername(), {
              method: 'PUT',
              headers: {
                  "Authorization": "Bearer " + sessionStorage.getItem('jwt'),
                    'Content-Type': 'application/json'
              },
                body: JSON.stringify(profile)
          });
          if (response.ok) {
              console.log('User updated successfully!');
              alert('User updated successfully!');
              navigate(from, { replace: true });
          }else{
                console.error('Failed to update user:', response);
                setError('Failed to update user.');
          }
      }catch (e) {
        console.error('Error:', e);
      }
  }

  const handlePromote = async (e) => {
      try {
          let response = await fetch(apiURL + '/users/' + adminUsername + '/makeAdmin', {
              method: 'PUT',
              headers: {
                  "Authorization": "Bearer " + sessionStorage.getItem('jwt'),
                  'Content-Type': 'application/json'
              },
          });
          if (response.ok) {
             console.log('User updated successfully!');
             alert('User updated successfully!');
          }else{
                console.error('Failed to update user:', response);
                alert('Failed to update user.');
          }
      }catch (e) {
          console.error('Error:', e);
          alert('Failed to update user.');
      }
  }

  const disableUser = async (e) => {
      try {
          let response = await fetch(apiURL + '/users/' + adminUsername, {
              method: 'DELETE',
              headers: {
                  "Authorization": "Bearer " + sessionStorage.getItem('jwt'),
                  'Content-Type': 'application/json'
              },
          });
          if (response.ok) {
              console.log('User disabled successfully!');
              alert('User disabled successfully!');
          }else{
              console.error('Failed to disable user:', response);
              alert('Failed to disable user.');
          }
      }catch (e) {
          console.error('Error:', e);
          alert('Failed to disable user.');
      }
  }

  const username = getUsername();

  return (
    <div className="profile-container">
      <h1 className="profile-heading">Edit Profile</h1>

      <div className="user-info">
        <p className="info-text">Welcome, {username}!</p>
      </div>

      <form className={"form"}>
          <div className="input-container">
                <span className="text-white">Username (not changeable)</span>
                <input type="text" className={"w-100"} name={"username"} value={profile.username} placeholder="Username" readOnly={true}></input>
          </div>
          <div className="input-container">
              {changePassword ? (
                <input type="password" className={"w-100"} name={"password"} value={profile.password} placeholder="New Password" onChange={(e) => setProfile({...profile, password: e.target.value})}></input>
              ) : (
                <button className="btn btn-primary w-100" onClick={() => setChangePassword(true)}>Change Password</button>
              )}
          </div>
          <div className="input-container">
              <input type="email" className={"w-100"} name={"email"} value={profile.email} placeholder="Email" onChange={(e) => setProfile({...profile, email: e.target.value})}></input>
          </div>

          <FailAlertMessage message={error} visible={error !== null} handleDismiss={() => setError(null)} />

          <button type="submit" className="btn btn-success w-100" onClick={handleSubmit}>Submit</button>
      </form>

        {getIsAdmin() ? (
            <div className="form mt-2 text-white">
                <p>Since you are an admin, use this panel to make someone else an admin or disable an account</p>
                <div className="input-container">
                    <input type="text" className={"w-100"} name={"username"} placeholder="Username" onChange={(e) => setAdminUsername(e.target.value)}></input>
                </div>
                <div className="input-container">
                    <button className="btn btn-primary" onClick={handlePromote}>Make Admin</button>
                    <button className="btn btn-danger" onClick={disableUser}>Disable User</button>
                </div>
            </div>
        ) : (
            <></>
        )}

    </div>
  );
}

export default Profile;
