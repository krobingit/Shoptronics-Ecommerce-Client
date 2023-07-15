import styled from "styled-components";
import loginpic from "../Assets/banners/loginpic.png";
import { Form } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import * as yup from "yup";
import "yup-phone";
import { useFormik } from "formik";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { useHistory } from "react-router-dom";
import { medium } from "../responsive";
import ScreenLockPortraitIcon from "@mui/icons-material/ScreenLockPortrait";
import { useState } from "react";
import Loader from "react-loader-spinner";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import VerifyOTPModal from "./VerifyOTPModal";
import axios from "axios";
import { API_URL } from "../globalconstant";

//styled components
const Container = styled.div`
  background-image: linear-gradient(
    to right top,
    #12100e,
    #251a18,
    #37222a,
    #3d2e46,
    #2b4162
  );
  background-size: cover;
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
`;
const CenterContainer = styled.div`
width:65rem;
box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
background:white;
border-radius:1rem;
overflow:hidden;
display:flex;
padding:0.6rem 0;
flex-direction:row;
margin:1.5rem;
  ${medium({ flexDirection: "column-reverse", height: "min-content" })}

    }
`;
const Info = styled.div`
  background: biege;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  margin-top: 2rem;
  :hover {
  }
`;
const ForgetContainer = styled.div`
  width: 60%;
  background: white;
  padding: 1rem;
  ${medium({ width: "100%" })};
`;
const InfoImage = styled.img`
  width: 75%;
  height: 20rem;
  ${medium({ width: "82%" })}
`;
const Para = styled.p`
  font-size: 1.2rem;
  margin: 1rem 0 0 0;
  text-align: center;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
`;
const Heading = styled.h3`
  font-size: 2.2rem;
  letter-spacing: 2px;
  text-align: center;
  font-family: "Patua One", cursive;
  color: #4f2f5e;
`;

const FormActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

const Initial = styled.span`
  color: gold;
`;
const Copy = styled.p`
  color: grey;
`;
const ErrorMessage = styled.p`
  color: red;
`;

function LoginWithMobile() {
  const [info, setInfo] = useState({
    severity: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [OTPInfo, setOTPInfo] = useState(null);
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const OTPSchema = yup.object({
    phone_number: yup
      .string()
      .phone("Please enter valid phone number")
      .required("Please enter your mobile number"),
  });

  const { setFieldValue, handleSubmit, handleBlur, errors, touched, values } =
    useFormik({
      initialValues: {
        phone_number: "+91",
      },
      validationSchema: OTPSchema,
      onSubmit: async (values, { resetForm }) => {
        if (!values.phone_number.split("").includes("+")) {
          values.phone_number = "+".concat(values.phone_number);
        }
        console.log(values, "OTP sent to this number");
        setLoading(true);
        let otpPayload = {
          channel: "sms",
          input: values.phone_number,
        };
        try {
          await axios
            .post(`${API_URL}otp/twilio/send`, otpPayload)
            .then((response) => {
              //code to verify otp send attempts to come here
              setOTPInfo(response.data);
              handleOpen();
            })
            .catch((error) => {
              throw new Error(error?.response?.data?.message);
            });
          resetForm();
        } catch (err) {
          setInfo({
            severity: "error",
            message: err.message,
          });
        }
        setLoading(false);
      },
    });
  const formStyles = {
    boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37)",
    padding: "2rem",
    borderRadius: "1rem",
    margin: "1.5rem 0.5rem 1.5rem 0.5rem",
  };

  return (
    <Container>
      <CenterContainer>
        <Info>
          <InfoImage src={loginpic}></InfoImage>
          <Para>Get Access to your Orders,Wishlist and Recommendations</Para>
          <Para style={{ color: "#4f2f5e" }}>
            New here? Sign up <KeyboardDoubleArrowDownIcon />
          </Para>
          <Button
            style={{
              marginTop: "3rem",
              width: "80%",
              fontSize: "1rem",
              color: "#4f2f5e",
              fontFamily: "Rubik, sans-serif",
            }}
            onClick={() => {
              history.push("/register");
            }}
            color="yellow"
          >
            SIGN UP
          </Button>
        </Info>
        <ForgetContainer>
          <Heading>
            <i className="fas fa-bolt" style={{ color: "gold" }}></i>{" "}
            <Initial>S</Initial>hoptronic<Initial>s</Initial>
          </Heading>
          <Form style={formStyles} onSubmit={handleSubmit}>
            <h3
              style={{
                textAlign: "center",
                letterSpacing: "1px",
                color: "#4f2f5e",
              }}
            >
              <ScreenLockPortraitIcon style={{ marginBottom: "-3px" }} /> LOGIN
              WITH MOBILE
            </h3>
            {/* <Form.Input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={errors.email && touched.email && errors.email}
              fluid
              label="Email/Username"
              placeholder="Email/Username"
              id="email"
              name="email"
              type="text"
            /> */}
            <PhoneInput
              country={"in"}
              value={values.phone_number}
              name="phone_number"
              onChange={(value) => {
                setFieldValue("phone_number", value);
              }}
              onBlur={(e) => handleBlur("phone_number")}
              defaultMask=".... ... ..."
              masks={{ in: ".... ... ..." }}
              onlyCountries={["in"]}
              inputProps={{
                name: "phone_number",
                required: true,
                autoFocus: true,
              }}
              disableSearchIcon={true}
              disableDropdown={true}
              inputStyle={{
                paddingLeft: "50px",
              }}
              countryCodeEditable={false}
            />
            <ErrorMessage>
              {errors.phone_number &&
                touched.phone_number &&
                "Invalid phone number"}
            </ErrorMessage>
            <FormActions>
              <Button
                type="submit"
                style={{
                  marginTop: "1rem",
                  width: "80%",
                  color: "#4f2f5e",
                  fontSize: "1rem",
                  fontFamily: "Rubik, sans-serif",
                  borderRadius: "1rem",
                }}
                color="yellow"
              >
                Send OTP
              </Button>
              {loading ? (
                <>
                  <Loader type="Oval" color="crimson" height={50} width={30} />
                  <p style={{ color: "purple" }}>Please wait..</p>
                </>
              ) : (
                info.message && (
                  <p
                    style={{
                      color: info.severity === "error" ? "red" : "blue",
                      marginTop: "1rem",
                      textAlign: "center",
                    }}
                  >
                    {info.message}
                  </p>
                )
              )}
            </FormActions>
            <hr />
            <p
              style={{
                color: "#4f2f5e",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              onClick={() => {
                history.push("/login");
              }}
            >
              ↩ Back to Login
            </p>
            <Copy> © 2021 Shoptronics</Copy>
          </Form>
        </ForgetContainer>
      </CenterContainer>
      <VerifyOTPModal
        open={open}
        handleClose={handleClose}
        input={OTPInfo?.verification?.to}
        flow={"login"}
      />
    </Container>
  );
}
export { LoginWithMobile };
