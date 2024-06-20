import axios from "axios";

const getToken = () => sessionStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
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

class PatientAPI {
  static async getPatients() {
    try {
      const response = await axiosInstance.get("/patients");
      return response.data;
    } catch (error) {
      console.error("Error fetching patients:", error);
      throw error;
    }
  }

  static async addPatient(patientData) {
    try {
      const response = await axiosInstance.post("/patients", patientData);
      return response.data;
    } catch (error) {
      console.error("Error adding patient:", error);
      throw error;
    }
  }

  static async getSinglePatient(id) {
    try {
      const response = await axiosInstance.get(`/patients/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching patient with ID ${id}:`, error);
      throw error;
    }
  }

  static async updatePatient(id, patient) {
    try {
      const response = await axiosInstance.put(`/patients/${id}`, patient);
      return response.data;
    } catch (error) {
      console.error(`Error updating patient with ID ${id}:`, error);
      throw error;
    }
  }

  static async deletePatient(id) {
    try {
      const response = await axiosInstance.delete(`/patients/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting patient with ID ${id}:`, error);
      throw error;
    }
  }

  static async findMedicationsByPatient(patientId) {
    try {
      const response = await axiosInstance.get(
        `/patients/${patientId}/medications`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching medications for patient ${patientId}:`,
        error
      );
      throw error;
    }
  }
}

export default PatientAPI;
