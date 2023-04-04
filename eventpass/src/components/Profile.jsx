import React, { useEffect, useState } from "react";
import { CheckSession, UpdateUser } from "../services/Auth";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedUser, setUpdatedUser] = useState(null);
  
    useEffect(() => {
      async function fetchUserInfo() {
        try {
          const userInfo = await CheckSession();
          setUser(userInfo);
          setUpdatedUser(userInfo);
        } catch (error) {
          console.error(error);
        }
      }
      fetchUserInfo();
    }, []);
  
    const handleUpdate = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const userData = Object.fromEntries(formData.entries());
        const updatedUserData = { ...user, ...userData };
        const updated = await UpdateUser(updatedUserData);
      
        if (updated) {
          setUpdatedUser(updated);
        }
      };
  
    function handleEdit() {
      setIsEditing(true);
    }
  
    function handleCancel() {
      setUpdatedUser(user);
      setIsEditing(false);
    }
  
    function handleChange(event) {
      const { name, value } = event.target;
      setUpdatedUser((prevUser) => ({ ...prevUser, [name]: value }));
    }
  
    if (!user) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <h1>Profile</h1>
        {isEditing ? (
          <>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              id="name"
              name="name"
              value={updatedUser.name}
              onChange={handleChange}
            />
            <br />
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              id="email"
              name="email"
              value={updatedUser.email}
              onChange={handleChange}
            />
            <br />
            <label htmlFor="state">State: </label>
            <input
              type="text"
              id="state"
              name="state"
              value={updatedUser.state}
              onChange={handleChange}
            />
            <br />
            <button onClick={handleUpdate}>Save Changes</button>
            <button onClick={handleCancel}>Cancel</button>
          </>
        ) : (
          <>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>State: {user.state}</p>
            <button onClick={handleEdit}>Edit Info</button>
          </>
        )}
      </div>
    );
}