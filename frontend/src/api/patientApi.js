import axiosClient from "./axiosClient";

export const getPatients = () => axiosClient.get("/patients");
export const createPatient = (data) => axiosClient.post("/patients", data);
export const updatePatient = (id, data) => axiosClient.put(`/patients/${id}`, data);
export const deletePatient = (id) => axiosClient.delete(`/patients/${id}`);
export const togglePatientStatus = (id) => axiosClient.patch(`/patients/${id}/toggle-status`);