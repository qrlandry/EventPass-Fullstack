import { useEffect, useState } from "react";
import { CheckSession, UpdateUser } from "../services/Auth";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
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
      console.log('i am stinky cheese', CheckSession())
    }, []);
  
    const handleNameChange = (event) => {
      setName(event.target.value);
    };
  
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
  
    const handleStateChange = (event) => {
      setState(event.target.value);
    };
  
    const handleUpdate = async (e, user) => {
      e.preventDefault();
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("state", state);
        await UpdateUser(user.id, formData);
        setUser({ ...user, name, email, state });
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
        <form onSubmit={(e) => handleUpdate(e, user)}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
            />
            <div>
              <label htmlFor="state">State:</label>
              <input
                type="text"
                id="state"
                name="state"
                value={state}
                onChange={handleStateChange}
              />
            </div>
          </div>
          <button type="submit">Update</button>
          <button onClick={() => navigate(-1)}> Back </button>
        </form>
      </div>
    );
  }