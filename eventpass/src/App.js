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
import Client from "./services/api";
import { BASE_URL } from "./services/api";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );
  const [user, setUser] = useState(null);
  const [evts, setEvents] = useState(null);
  const [venues, setVenues] = useState(null);
  const [tickets, setTickets] = useState(null);

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
    console.log("THE USER IS ", user);
  }, [user]);

  useEffect(() => {
    const getEvents = async () => {
      const response = await Client.get(`${BASE_URL}/events`);
      console.log("EVENTS RETURNED:", response.data);
      setEvents(response.data);
    };
    getEvents();
  }, []);

  useEffect(() => {
    const getVenues = async () => {
      const response = await Client.get(`${BASE_URL}/venues`);
      console.log("VENUES RETURNED:", response.data);
      setVenues(response.data);
    };
    getVenues();
  }, []);

  useEffect(() => {
    const getTickets = async () => {
      const response = await Client.get(`${BASE_URL}/tickets`);
      console.log("TICKETS RETURNED:", response.data);
      setTickets(response.data);
    };
    getTickets();
  }, []);

  return (
    <div className="App">
      <UserContext.Provider
        value={{ loggedIn, setLoggedIn, user, setUser, handleLogOut }}
      >
        <main>
          <Routes>
            <Route path="signin" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="/" element={<Home evts={evts} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/event/details/:id"
              element={<EventDetails evts={evts} />}
            />
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
