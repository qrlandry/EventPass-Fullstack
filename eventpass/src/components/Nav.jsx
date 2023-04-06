import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { LogoutUser } from "../services/Auth";
import SearchBar from "./SearchBar";

// import SearchBar from "./SearchBar"
import "../styles/Nav.css";

export default function Nav(props) {
  const navigate = useNavigate();
  const [onSignInPage, setOnSignInPage] = useState(false);
  const { loggedIn, setLoggedIn } = useContext(UserContext);

  const handleSignout = async (e) => {
    e.preventDefault();
    await LogoutUser();
    setLoggedIn(false);
    console.log("logged out!");
    navigate("/");
  };

  // const signInClick = () => {
  //   setOnSignInPage()
  // }

  return (
    <div className="nav-container">
      <div className="nav-links">
        <div className="menu-items">
          <ul>
            {/* <li>
              <NavLink to="/" className="menu-item" style={{fontStyle: 'italic'}}>EventPass </NavLink>
            </li> */}
            <li>
              <NavLink to="/concerts" className="menu-item" style={{opacity: '0'}}>
                Concerts
              </NavLink>
            </li>
            <li>
              <NavLink to="/sports" className="menu-item" style={{opacity: '0'}}>
                Sports
              </NavLink>
            </li>
            <li>
              <NavLink to="/comedy" className="menu-item" style={{opacity: '0'}}>
                Comedy
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="top-right">
          {loggedIn ? (
            <div className="cart">
              <NavLink to="/cart" className="menu-item">
                Cart
              </NavLink>
            </div>
          ) : null}
          {loggedIn ? (
            <div className="profile" style={{ marginRight: "1vw" }}>
              <NavLink to="/profile" className="menu-item">
                Profile
              </NavLink>
            </div>
          ) : null}
          {!loggedIn ? (
            <div className="signin">
              <NavLink to="/signin" className="menu-item">
                Sign In
              </NavLink>
            </div>
          ) : (
            <div className="signout">
              <NavLink to="/" className="menu-item" onClick={handleSignout}>
                Sign Out
              </NavLink>
            </div>
          )}
        </div>
      </div>
      <SearchBar evts={props.evts} />
    </div>
  );
}
