import { commonRequest } from '../axiosreq'
//this action is initiated in Pages>Login.jsx under OnSubmit formik function
export const login = async (dispatch, user) =>
{
dispatch({type:"loginInitiate"})
 try {
  const response = await commonRequest.post("/userauth/login", user).catch((error)=>{
    console.log(error.request)
   const errorMessage=error.request.statusText || error.message
   console.log(errorMessage)
   if(errorMessage)
    throw new Error(errorMessage)
  })
  dispatch({ type: "loginOK", payload: response.data })
  return {
    isUserTrue:true,
    errorMessage:null
  }
 }
 catch (err)
 {
  dispatch({ type: "loginFail" })
  return {
    isUserTrue:false,
    errorMessage:err.message
  };

 }

}
