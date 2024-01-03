import axios from "axios";
import { API_URL } from "../globalconstant";
import { store } from "../Redux/store";
import { commonRequest } from "../axiosreq";

export const GetRefreshAccessTokenAndUpdateStore = async (userid) => {
  try {
    await axios.post(`${API_URL}userauth/refreshToken`, {
      userid,
    }).then((data)=>{
      if(data?.data?.refreshToken)
      store.dispatch({
        type: "updateToken",
        payload: {
          refreshToken: data?.data.refreshToken,
        },
      });
      else 
      throw Error("Error while fetching refresh token")
    })
    return "success"
  } catch (error) {
    console.log("Error while fetching refresh token,hence logging out",error);
    commonRequest.get("/auth/logout",{
        withCredentials: true,
      }).then(()=>{
        store.dispatch({ type: "logOut" });
      })
  }
};
