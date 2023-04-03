import React, { useEffect, useState } from "react";
import { CheckSession } from "../services/Auth";

export default function Profile() {
  const [user, setUser] = useState(null);
  
  
  useEffect(() => {
    async function fetchUserInfo() {
      const userInfo = await CheckSession();
      setUser(userInfo);
      console.log(userInfo)
    }
    fetchUserInfo();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>State: {user.state}</p>
    </div>
  );
}
