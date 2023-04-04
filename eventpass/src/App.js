import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "./UserContext.jsx";
import Home from "./components/Home";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Cart from "./components/Cart";
import Profile from "./components/Profile";
import EventDetails from "./components/EventDetails";
import { CheckSession } from "./services/Auth";
import axios from "axios";

function App() {

  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("loggedIn") === "true");
  const [user, setUser] = useState(null);

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setUser(null);
  };

  useEffect(() => {
    const getSession = async () => {
      const sessionUser = await CheckSession();
      setUser(sessionUser);
      setLoggedIn(sessionUser !== null);
    };

    getSession();
  }, []);

  useEffect(() => {
    if (user !== null) {
      console.log("THE USER IS ", user);
    }
  }, [user]);

  return (
    <div className="App">
      <UserContext.Provider
        value={{ loggedIn, setLoggedIn, user, setUser, handleLogOut }}
      >
        <main>
          <Routes>
            <Route path="signin" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/event/details/:id" element={<EventDetails />} />
          </Routes>
        </main>
        <footer>
          <div className="footer">
            <p>
              By continuing past this page, you agree to our{" "}
              <a href="#" className="footer-link">
                Terms of Use.
              </a>
            </p>
            <p>
              <a href="#" className="footer-link">
                Privacy Policy
              </a>{" "}
              | © 2023 EventPass. All rights reserved.
            </p>
          </div>
        </footer>
      </UserContext.Provider>
    </div>
  );
}

export default App;
