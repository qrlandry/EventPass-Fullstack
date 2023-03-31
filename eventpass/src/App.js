import './App.css';
import './styles/Footer.css'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { UserContext } from './UserContext.jsx'
import Home from './components/Home';
import Nav from './components/Nav';
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'

function App() {

  const [ loggedIn, setLoggedIn ] = useState(false)

  return (
    <div className="App">
      <header className="App-header">
      <UserContext.Provider value={{ loggedIn, setLoggedIn }}>
        <Nav />
      </UserContext.Provider>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/signin' element={<Login />}/>
          <Route path='register' element={<Register />}/>
        </Routes>
      </main>
      <footer>
        <div className="footer">
          <p>By continuing past this page, you agree to our <a href="#" className="footer-link">Terms of Use.</a></p>
          <p><a href="#" className="footer-link">Privacy Policy</a> | © 2023 EventPass. All rights reserved.</p>
          
        </div>
      </footer>
    </div>
  );
}

export default App;
