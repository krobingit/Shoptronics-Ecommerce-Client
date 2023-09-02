import axios from "axios";

export const commonRequest = axios.create({
  baseURL: "https://shoptronics-prod.up.railway.app/",
});
