import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { SignInUser } from '../services/Auth'
import { UserContext } from '../UserContext' 
import '../styles/Login.css'

export default function Login(){
  let navigate = useNavigate()
  const { setUser } = useContext(UserContext);

  const [formValues, setFormValues] = useState({email: '', password: ''})

  const handleChange = (e) => {
    setFormValues({...formValues, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = await SignInUser(formValues);
    setFormValues({ email: "", password: "" });
    setUser(payload);
    console.log("logged in!");
    navigate('/')
  }

  return (
    <div className="signin-form">
      <h5 style={{fontSize: '2vh'}}>Sign In</h5>
      <p style={{fontSize: '1.5vh'}}>Don't have an account? <NavLink to='/register' style={{textDecoration:'none', color: 'blue', fontWeight: 'bold'}}>Register</NavLink></p>
      <form onSubmit={handleSubmit}>
        <input type="text" name='email' placeholder='email' id='login-email' onChange={handleChange}/>
        <input type="password"  name='password' placeholder='password' id='login-password' onChange={handleChange}/>
        <NavLink to='/resetpassword' style={{textDecoration:'none', color: 'blue', fontWeight: 'bold', fontSize: '1vh', display: 'block', marginBottom: '1vh'}}>Forgot Password?</NavLink>
        <button type="submit">Sign In</button>
      </form>
    </div>
  )

}
