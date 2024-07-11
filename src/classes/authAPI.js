import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const getToken = () => sessionStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


class AuthAPI {
  static async getUser() {
    try {
      const jwtToken = sessionStorage.getItem("token");

      if (!jwtToken) {
        throw new Error("No token found");
      }

      const response = await axiosInstance.get("/auth/users", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }

  static async Register(credentials) {
    try {
      const response = await axiosInstance.post("/auth/register", credentials);
      return response.data;
    } catch (error) {
     if (error.response) {
       throw new Error(error.response.data.message);
     } else {
       throw new Error("Signup failed");
     }
    }
  }

  static async Login(credentials) {
    try {
      const response = await axiosInstance.post("/auth/login", credentials);
      return response.data;
    } catch (error) {
      console.error("Error logging in a user:", error);
      throw error;
    }
  }

  static async UpdateUser(credentials) {
    try {
      const response = await axiosInstance.put("/auth/users", credentials);
      return response.data;
    } catch (error) {
      console.error("Error updating a user:", error);
      throw error;
    }
  }

  static async RefreshStatus() {
    try {
      const response = await axiosInstance.post("/auth/refresh");
      return response.data;
    } catch (error) {
      console.error("Error updating a user:", error);
      throw error;
    }
  }
}

export default AuthAPI;
