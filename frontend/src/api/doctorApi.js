import axiosClient from "./axiosClient";

export const getDoctors = () => axiosClient.get("/doctors");
export const createDoctor = (data) => axiosClient.post("/doctors", data);
export const updateDoctor = (id, data) => axiosClient.put(`/doctors/${id}`, data);
export const deleteDoctor = (id) => axiosClient.delete(`/doctors/${id}`);
export const toggleDoctorStatus = (id) => axiosClient.patch(`/doctors/${id}/toggle-status`);