import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { RegisterUser } from '../services/Auth';

export default function Register(){
  const navigate = useNavigate()
  const [ inputValues, setInputValues ] = useState({
    name: '',
    email: '',
    password: '',
    state: '',
    })
  const handleChange = (e) => {
    e.preventDefault()
    setInputValues({...inputValues, [e.target.name]: e.target.value})
    console.log(inputValues)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    await RegisterUser({
      name: inputValues.name,
      email: inputValues.email,
      password: inputValues.password,
      state: inputValues.state
    })
    setInputValues({
      name: "",
      email: "",
      password: "",
      state: "",
    });
    navigate('/signin')
  }

  return (
    <div className="register-form">
      <h5 style={{fontSize: '2vh'}}>Sign Up</h5>
      <p style={{fontSize: '1.5vh'}}>Already registered? <NavLink to='/signin' style={{textDecoration:'none', color: 'blue', fontWeight: 'bold'}}>Sign In</NavLink></p>
      <form onSubmit={handleSubmit}>
        <input type="text" name='name' placeholder='name' id='login-name' onChange={handleChange}/>
        <input type="text" name='email' placeholder='email' id='login-email' onChange={handleChange}/>
        <input type="password"  name='password' placeholder='password' id='login-password' onChange={handleChange}/>
        <input type="text"  name='state' placeholder='state ex. PA' id='login-state' maxLength="2" onChange={handleChange}/>
        <button type="submit">Next</button>
      </form>
    </div>
  )
}