import axios from "axios";

export const client = axios.create({
    baseURL: process.env.BACKEND,
    withCredentials: true
})