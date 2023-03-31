import './App.css';
import { Routes, Route } from 'react-router-dom'
import { useState , useContext, useEffect} from 'react'
import { UserContext } from './UserContext.jsx'
import Home from './components/Home';
import Nav from './components/Nav';
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import SearchBar from './components/SearchBar';

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

  return (
    <div className="App">
      <header className="App-header">
      <UserContext.Provider value={{ loggedIn, setLoggedIn }}>
        <Nav />
        <h5 className='headline'>The best deals for your best memories</h5>
        <SearchBar />
      </UserContext.Provider>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/signin' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
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
