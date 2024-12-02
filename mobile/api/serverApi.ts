import axios from "axios";

export const serverAPI = axios.create({
  baseURL: "http://host.docker.internal:3000"
})