import { useDispatch, useSelector } from "react-redux";
import { commonRequest } from "../axiosreq";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const OAuthSuccessRedirect = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const history = useHistory();
  useEffect(() => {
    async function loginUser() {
      await commonRequest
        .get("/auth/login/success", {
          withCredentials: true,
        })
        .then((response) => {
          dispatch({ type: "loginOK", payload: response.data });
          history.push("/");
        });
    }
    try {
      !currentUser && loginUser();
    } catch (err) {
      console.log(err, "OAuth Not Authenticated");
    }
  });
  return "Redirecting to Shoptronics Home..";
};

export default OAuthSuccessRedirect;
