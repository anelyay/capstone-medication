import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

class PatientAPI {
  static async getPatients() {
    const response = await axiosInstance.get("/patients");
    return response.data;
  }

  static async addPatient(patient) {
    const response = await axiosInstance.post("/patients", patient);
    return response.data;
  }

  static async getSinglePatient(id) {
    const response = await axiosInstance.get(`/patients/${id}`);
    return response.data;
  }

  static async updatePatient(id, patient) {
    try {
      const response = await axiosInstance.put(`/patients/${id}`, patient);
      console.log(patient);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }

  static async deletePatient(id) {
    const response = await axiosInstance.delete(`/patients/${id}`);
    return response.data;
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
