import { useDispatch, useSelector } from "react-redux";
import { commonRequest } from "../axiosreq";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";

const OAuthSuccessRedirect = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const history = useHistory();
  const [error, setError] = useState(false);
  useEffect(() => {
    async function loginUser() {
      await commonRequest
        .get("/auth/login/success", {
          withCredentials: true,
        })
        .then((response) => {
          dispatch({ type: "loginOK", payload: response.data });
          history.push("/");
        })
        .catch((error) => {
          console.log("Unauthorized");
          setError(error.response);
        });
    }
    !currentUser && loginUser();
  }, [currentUser, dispatch, history]);
  return error
    ? `${error.status} ${error.statusText}`
    : "Redirecting to Shoptronics Home..";
};

export default OAuthSuccessRedirect;
