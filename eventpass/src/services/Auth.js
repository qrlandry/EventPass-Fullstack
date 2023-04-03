import Client from "./api"
import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie';
import axios from "axios";

const token = Cookies.get('jwt');
console.log('Token:', token);

if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const RegisterUser = async (data) => {
  try {
    const res = await Client.post("/register", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const SignInUser = async (data, setUser) => {
  try {
    const res = await Client.post("/login", data);
    const token = res.data.jwt;
    setUser(res.data.user);
    setAuthToken(token); // Store the token in axios headers
    Cookies.set('jwt', token); // Store the token as a cookie
    return res.data;
  } catch (error) {
    console.error(error);
    throw error.res.data;
  }
};

export const CheckSession = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return null;
    }
    const decodedToken = jwt_decode(token);
    const user = decodedToken.user;
    const res = await Client.get("/user");
    return { ...res.data, user };
  } catch (error) {
    throw error;
  }
};

export const LogoutUser = async () => {
  try {
    const res = await Client.post("/logout");
    return res.data;
  } catch (error) {
    throw error;
  }
};