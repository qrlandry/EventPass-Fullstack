import React, { useEffect, useState } from "react";
import { CheckSession, UpdateUser } from "../services/Auth";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedUser, setUpdatedUser] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [state, setState] = useState("");
  

    useEffect(() => {
        const fetchUser = async () => {
          const fetchedUser = await CheckSession();
          setUser(fetchedUser);
          setName(fetchedUser.name);
          setEmail(fetchedUser.email);
          setState(fetchedUser.state);
        };
    
        fetchUser();
      }, []);
  
      const handleUpdate = async (e) => {
        e.preventDefault();
        try {
          const formData = new FormData();
          if (user && user.data) {
            if (user.data.name) {
              formData.append("name", user.data.name);
            }
            if (user.data.email) {
              formData.append("email", user.data.email);
            }
            if (user.data.state) {
              formData.append("state", user.data.state);
            }
          }
          await UpdateUser(formData);
        } catch (error) {
          console.error("Error updating profile: ", error);
        }
      };
      
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={handleUpdate}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <div>
          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            name="state"
            value={state}
            onChange={(event) => setState(event.target.value)}
          />
        </div>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}