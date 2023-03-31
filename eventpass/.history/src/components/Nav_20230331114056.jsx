import { NavLink } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import { useContext } from "react"
import { UserContext } from "../UserContext"
import { LogoutUser } from '../services/Auth'
import '../styles/Nav.css'


export default function Nav(){
  
  const navigate = useNavigate()

  const { loggedIn, setLoggedIn } = useContext(UserContext)
  const { setUser } = useContext(UserContext)

  const handleSignout = async (e) => {
    e.preventDefault()
    await LogoutUser()
    setLoggedIn(false)
    navigate('/')
  }

  return(
    <div className="nav-container">
      <div className="menu-items">
        <ul>
          <li>
            <NavLink to="/" className="menu-item">EventPass </NavLink>
          </li>
          <li>
            <NavLink to="/concerts" className="menu-item">Concerts</NavLink>
          </li>
          <li>
            <NavLink to="/sports" className="menu-item">Sports</NavLink>
          </li>
          <li>
            <NavLink to="/standup" className="menu-item">Comedy</NavLink>
          </li>
        </ul>


      </div>
      <div className="top-right">
      {
        loggedIn ? 
        <div className="cart">
          <NavLink to="/mycart" className="menu-item">Cart</NavLink>
        </div> : null
      }  
      {
        !loggedIn ? 
        <div className="signin">
          <NavLink to="/signin" className="menu-item">Sign In</NavLink>
        </div> : 
        <div className="signout">
          <NavLink to="/" className="menu-item" onClick={handleSignout}>Sign Out</NavLink>
        </div>
      }
      </div>



    </div>
  )
}
