import './App.css';
import './styles/Footer.css'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { UserContext } from './UserContext.jsx'
import Home from './components/Home';
import Nav from './components/Nav';
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import { CheckSession } from './services/Auth';

function App() {

  const [ loggedIn, setLoggedIn ] = useState(false)
  const [user, setUser] = useState(null)

  const handleLogOut = () => {
    toggleAuthenticated(false);
    localStorage.clear();
  };

  const checkToken = async () => {
    const user = await CheckSession();
    setUser(user);
    toggleAuthenticated(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      checkToken();
    }
  }, []);

  return (
    <div className="App">
      <UserProvider.Provider
        value={{
          user,
          setUser,
          loggedIn,
          setLoggedIn,
          handleLogOut,
        }}
      ></UserProvider.Provider>
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
