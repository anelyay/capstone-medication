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

class MedicationAPI {
  static async getMedications() {
    const response = await axiosInstance.get("/medications");
    return response.data;
  }

  static async addMedication(medication) {
    try {
      const response = await axiosInstance.post("/medications", medication);
      return response.data;
    } catch (error) {
      console.log("Error adding medication:", error.response.data);
      throw error;
    }
  }

  static async getSingleMedication(id) {
    const response = await axiosInstance.get(`/medications/${id}`);
    return response.data;
  }

  static async updateMedication(id, medication) {
    try {
      const response = await axiosInstance.put(
        `/medications/${id}`,
        medication
      );
      return response.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }

  static async deleteMedication(id) {
    const response = await axiosInstance.delete(`/medications/${id}`);
    return response.data;
  }

  static async markMedAsTaken(id, medication) {
    try {
      const response = await axiosInstance.put(
        `/medications/taken/${id}`,
        medication
      );
      return response.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }

  static async getActivityLog(id) {
    try {
      const response = await axiosInstance.get(`/medications/log/${id}`);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }
}

export default MedicationAPI;
