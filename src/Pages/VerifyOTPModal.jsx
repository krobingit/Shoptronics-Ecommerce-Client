import { Modal } from "@mui/material";
import { Button } from "semantic-ui-react";
import OTPInput from "react-otp-input";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../globalconstant";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";
import { otpLogin } from "../Actions/otp_login_actions";
import { useDispatch } from "react-redux";
import { medium, small } from "../responsive";
import { commonRequest } from "../axiosreq";

const VerifyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  background-color: white;
  height: 70vh;
  width: 50vw;
  border-radius: 13px;
  ${medium({
    width: "65vh",
    marginLeft: "20px",
    marginRight: "20px",
    padding: "5px",
  })};
`;
const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InputBoxSeperator = styled.div`
  padding: 10px;
  ${small({ padding: "5px" })};
  ${medium({ padding: "7px" })};
`;
const InputBox = styled.input`
  width: 3rem !important;
  height: 3rem;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  ${small({ width: "2.5rem !important" })};
  ${medium({ width: "2.3rem !important" })};
`;
const MessageContent = styled.p`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: ${(props) => (props.severity === "error" ? "red" : "#0000a0")};
  font-weight: 700;
  text-align: center;
`;
const VerifyOTPModal = ({
  open,
  handleClose,
  input,
  flow,
  registerValues = null,
}) => {
  const [otp, setOtp] = useState("");
  const [loader, setLoader] = useState(false);
  const [userMessage, setUserMessage] = useState({
    severity: "",
    message: "",
    redirection: false,
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const handleBackdropClick = (event) => {
    // Prevent modal closure when clicking outside
    event.stopPropagation();
  };
  const verifyOTP = async () => {
    if (flow === "login") {
      try {
        setLoader(true);
        if (otp.length === 6 && input)
          await axios
            .post(`${API_URL}otp/twilio/verify`, {
              input,
              otp,
            })
            .then(async (response) => {
              console.log(response);
              let result = await otpLogin(dispatch, { phone_number: input });
              if (!result.isUserTrue) {
                setLoader(false);
                setOtp("");
                setUserMessage({
                  severity: "error",
                  message: result.errorMessage,
                  redirection: false,
                });
              } else if (result.isUserTrue && response.data) {
                setLoader(false);
                setUserMessage({
                  severity: "message",
                  redirection: true,
                  message: response.data?.message,
                });
                setTimeout(() => {
                  history.push("/products");
                }, 2000);
              }
            })
            .catch((error) => {
              setLoader(false);
              throw new Error(error?.response?.data?.message);
            });
      } catch (error) {
        setUserMessage({
          severity: "error",
          message: error.message,
        });
      }
    } else if (flow === "register" && registerValues) {
      console.log("Register Flow");
      try {
        setLoader(true);
        if (otp.length === 6 && input)
          await axios
            .post(`${API_URL}otp/twilio/verify`, {
              input,
              otp,
            })
            .then(async (response) => {
              console.log(response);
              await commonRequest
                .post(`${API_URL}userauth/register`, registerValues)
                .then((response) => {
                  setLoader(false);
                  console.log(response.data);
                  setUserMessage({
                    severity: "message",
                    message: response.data.userMessage,
                    redirection: true,
                  });
                  setTimeout(() => {
                    history.push("/loginWithMobile");
                  }, 5000);
                })
                .catch((error) => {
                  setLoader(false);
                  setUserMessage(error?.response?.data?.error || error.message);
                });
            })
            .catch((error) => {
              setLoader(false);
              throw new Error(error?.response?.data?.message);
            });
      } catch (error) {
        setUserMessage({
          severity: "error",
          message: error.message,
        });
      }
    }
  };
  return (
    <StyledModal
      BackdropProps={{
        onClick: handleBackdropClick, // Handle backdrop click event
      }}
      disableBackdropClick // Disable closing on backdrop click
      open={open}
      onClose={handleClose}
    >
      <VerifyContainer>
        <h4
          style={{
            textAlign: "center",
            letterSpacing: "1px",
            color: "#4f2f5e",
            margin: "0",
            padding: "0",
          }}
        >
          Verify by OTP for <span style={{ color: "#ff6400" }}>{input}</span>
        </h4>
        <h4
          style={{
            textAlign: "center",
            letterSpacing: "1px",
            color: "#4f2f5e",
          }}
        >
          Enter the 6 Digit OTP sent to this number
        </h4>
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<InputBoxSeperator>-</InputBoxSeperator>}
          renderInput={(props) => <InputBox {...props} />}
        />
        <MessageContent severity={userMessage.severity}>
          {userMessage.message && userMessage.message}
          {userMessage.redirection && (
            <Loader type="Oval" color="crimson" height={50} width={30} />
          )}
        </MessageContent>
        <Button
          loading={loader}
          onClick={verifyOTP}
          style={{
            color: "#4f2f5e",
            marginTop: "1rem",
            width: "80%",
            fontSize: "1rem",
            fontFamily: "Rubik, sans-serif",
            borderRadius: "1rem",
          }}
          color="yellow"
        >
          Continue
        </Button>
        <Button
          onClick={() => {
            setOtp("");
            setUserMessage("");
            handleClose();
          }}
        >
          Close
        </Button>
      </VerifyContainer>
    </StyledModal>
  );
};

export default VerifyOTPModal;
