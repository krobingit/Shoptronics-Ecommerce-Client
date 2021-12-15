import { commonRequest } from './axiosreq'

export const login = async (dispatch, user) => {
dispatch({type:"loginInitiate"})
 try {
  const response = await commonRequest.post("/userauth/login", user)
  dispatch({ type:"loginOK",payload:response.data})
  return true;
 }
 catch (err)
 {
  dispatch({ type: "loginFail" })
  return false;

 }

}





