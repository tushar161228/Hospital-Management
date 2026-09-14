import axiosClient from "./axiosClient";

export const signupUser = (data) => axiosClient.post("/auth/signup", data);
export const loginUser = (data) => axiosClient.post("/auth/login", data);