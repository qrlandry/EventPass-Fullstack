import './App.css';
import { Routes, Route } from 'react-router-dom'
import { useState , useContext, useEffect} from 'react'
import { UserContext } from './UserContext.jsx'
import Home from './components/Home';
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Cart from './components/Cart';
import Profile from './components/Profile';
import axios from 'axios';
import Cookies from 'js-cookie';

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');
  const [user, setUser] = useState(null);
  
  const handleLogOut = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('loggedIn');
    setLoggedIn(false);
    setUser(null)
  };

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = Cookies.get('jwt');
        if (token) {
          const res = await axios.get('/api/user', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setUser(res.data);
          setLoggedIn(true);
          localStorage.setItem('jwt', token); // set JWT in local storage
          localStorage.setItem('loggedIn', 'true');
        } else {
          localStorage.removeItem('jwt'); // remove JWT from local storage
          localStorage.removeItem('loggedIn');
          setLoggedIn(false);
          setUser(null);
        }
      } catch (error) {
        console.log(error);
        localStorage.removeItem('jwt'); // remove JWT from local storage
        localStorage.removeItem('loggedIn');
        setLoggedIn(false);
        setUser(null);
      }
    };
  
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoggedIn(localStorage.getItem('loggedIn') === 'true');
    } else {
      checkLoggedIn();
    }
  }, []);

  useEffect(() => {
    console.log("THE USER IS ", user);
    if (!user) {
      localStorage.removeItem('jwt');
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('user'); // remove user data from local storage
      setLoggedIn(false);
    } else {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(user)); // store user data in local storage
    }
  }, [user]);

  return (
    <div className="App">
      <UserContext.Provider value=
      {{ loggedIn,
         setLoggedIn,
         user,
         setUser,
         handleLogOut, }}>

      <main>
        <Routes>
          <Route path='signin' element={<Login />}/>
          <Route path='register' element={<Register />}/>
          <Route path='/' element={<Home />}/>
            <Route path='/cart' element={<Cart />}/>
            <Route path='/profile' element={<Profile />}/>
        </Routes>
      </main>
      <footer>
        <div className="footer">
          <p>By continuing past this page, you agree to our <a href="#" className="footer-link">Terms of Use.</a></p>
          <p><a href="#" className="footer-link">Privacy Policy</a> | © 2023 EventPass. All rights reserved.</p>
          
        </div>
      </footer>
      </UserContext.Provider>
    </div>
  );
}

export default App;
