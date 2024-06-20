import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

class AuthAPI {
  static async getUser() {
    const jwtToken = sessionStorage.getItem("token");

    try {
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
}

export default AuthAPI;
