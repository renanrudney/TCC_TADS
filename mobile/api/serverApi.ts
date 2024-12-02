import axios from "axios";
import Constants from 'expo-constants'
import { Platform } from "react-native";

const apiDomain = Constants.expoConfig?.hostUri?.split(`:`)?.shift()?.concat(':3000')
const platformUrl = Platform.OS === 'ios' ? apiDomain : "http://10.0.2.2:3000"
export const serverAPI = axios.create({
  baseURL: apiDomain ? `http://${apiDomain}` : platformUrl
})
