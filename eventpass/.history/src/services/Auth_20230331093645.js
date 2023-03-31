import Client from "./api"

export const RegisterUser = async (data) => {
    try {
      const res = await Client.post("/api/register", data);
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  export const SignInUser = async (data) => {
    try {
      const res = await Client.post("/api/login", data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      return res.data.user;
    } catch (error) {
      throw error;
    }
  };

  export const CheckSession = async () => {
    try {
      const res = await Client.get("/auth/session");
      return res.data;
    } catch (error) {
      throw error;
    }
  };