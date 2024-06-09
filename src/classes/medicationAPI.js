import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

class MedicationAPI {
  static async getMedications() {
    const response = await axiosInstance.get("/medications");
    return response.data;
  }

  static async addMedication(medication) {
    const response = await axiosInstance.post("/medications", medication);
    return response.data;
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
        `medications/taken/${id}`,
        medication
      );
      return response.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }

  static async getActivityLog(id) {
    try {
      const response = await axiosInstance.get(`medications/log/${id}`);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }
}

export default MedicationAPI;
