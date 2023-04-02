import './App.css';
import { Routes, Route } from 'react-router-dom'
import { useState , useContext, useEffect} from 'react'
import { UserContext } from './UserContext.jsx'
import Home from './components/Home';
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Cart from './components/Cart';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  
  const handleLogOut = () => {
    setLoggedIn(false);
    localStorage.clear();
  };
  // const checkToken = async () => {
  //   const user = await CheckSession();
  //   setUser(user);
  //   setLoggedIn(true);
  // };
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     checkToken();
  //   }
  // }, []);

  useEffect(() => {
    console.log("THE USER IS ", user)
  }, [user])

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
