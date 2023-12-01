import axios from "axios";
import { API_URL } from "../globalconstant";
import { store } from "../Redux/store";
import { commonRequest } from "../axiosreq";

export const GetRefreshAccessTokenAndUpdateStore = async (userid) => {
  try {
    const response = await axios.post(`${API_URL}userauth/refreshToken`, {
      userid,
    });
    store.dispatch({
      type: "updateToken",
      payload: {
        refreshToken: response.data.refreshToken,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error while fetching refresh token,hence logging out");
    commonRequest.get("/auth/logout",{
        withCredentials: true,
      }).then(()=>{
        store.dispatch({ type: "logOut" });
      })
  }
};
