import { commonRequest } from "../axiosreq";
//this action is initiated in Pages>Login.jsx under OnSubmit formik function
export const otpLogin = async (dispatch, user) => {
  dispatch({ type: "loginInitiate" });
  try {
    await commonRequest
      .post("/otp/login", user)
      .then((response) => {
        dispatch({ type: "loginOK", payload: response.data });
      })
      .catch((error) => {
        const errorMessage = error?.response?.data?.error || error.message;
        if (errorMessage) throw new Error(errorMessage);
      });

    return {
      isUserTrue: true,
      errorMessage: null,
    };
  } catch (err) {
    dispatch({ type: "loginFail" });
    return {
      isUserTrue: false,
      errorMessage: err.message,
    };
  }
};
