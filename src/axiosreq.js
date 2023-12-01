import axios from "axios";
import { GetRefreshAccessTokenAndUpdateStore } from "./services/refreshTokenService";

const commonRequest=axios.create({
  baseURL: "https://shoptronics-ecom.onrender.com/",
});
commonRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const userid=localStorage.getItem("uid")
    // If the error is due to an expired token
    if (error.response.status === 403  && error.response?.data?.error?.name==="TokenExpiredError") {
     await GetRefreshAccessTokenAndUpdateStore(userid);
    }
    // If it's not a token expiration error, reject with the original error
    return Promise.reject(error);
  }
);

export {commonRequest}