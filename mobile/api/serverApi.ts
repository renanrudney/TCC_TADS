import axios from "axios";

export const serverAPI = axios.create({
  baseURL: "http://172.19.106.156:3000"
})