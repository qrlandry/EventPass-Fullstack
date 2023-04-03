import './App.css';
import { Routes, Route } from 'react-router-dom'
import { useState , useContext, useEffect} from 'react'
import { UserContext } from './UserContext.jsx'
import Home from './components/Home';
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Cart from './components/Cart';

function App() {
  const loggedIn = localStorage.getItem('loggedIn') === 'true'
  const [user, setUser] = useState(null);
  
  const handleLogOut = () => {
    localStorage.removeItem('loggedIn');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      // Make a request to the server to verify the token
      fetch('/api/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(data => setUser(data))
        .catch(error => console.error(error));
    }
  }, []);


  useEffect(() => {
    console.log("THE USER IS ", user)
  }, [user])

  return (
    <div className="App">
      <UserContext.Provider value=
      {{ loggedIn,
         user,
         setUser,
         handleLogOut, }}>

      <main>
        <Routes>
          <Route path='signin' element={<Login />}/>
          <Route path='register' element={<Register />}/>
          <Route path='/' element={<Home />}/>
            <Route path='/cart' element={<Cart />}/>
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
