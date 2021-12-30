import { useHistory } from "react-router-dom";
import { AdminNav } from "../Components/AdminNavBar";
import { useFormik } from "formik";
import { Form } from "semantic-ui-react";
import { commonRequest } from "../axiosreq";
import styled from "styled-components";
import { Button } from "semantic-ui-react";
import { ToastContainer, toast } from "react-toastify";
import * as yup from "yup";
import { useState } from "react";
import { Checkbox } from "semantic-ui-react";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;
const signUpSchema = yup.object({
  username: yup
    .string()
    .min(5, "Minimum 5 characters needed")
    .required("Username is mandatory"),
  email: yup.string().email().required("Please enter your Email"),
  password: yup
    .string()
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/,
      "Password must be eight characters or more including one uppercase letter,one lowercase letter, ,one number,one special character"
    )
    .required("Please enter your new password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required Field"),
  isAdmin: yup.boolean().default(false),
});

export const AdminUserAdd = () => {

  let history = useHistory();
  const [check, setCheck] = useState(false);
  const ToastSuccess = () => {
    return toast.success("User Added Successfully", {
      position: "bottom-right",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      theme: "colored",
    });
 };
 const ToastError = () => {
    return toast.error("Username/Email Already Exists", {
      position: "bottom-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      theme: "colored",
    });
  };


  const { handleChange, handleSubmit, handleBlur, errors, touched, values } =
   useFormik({
      initialValues: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        isAdmin: false,
      },
      validationSchema: signUpSchema,
      onSubmit: async (values,{resetForm}) => {
       const { confirmPassword, ...others } = values;
        try {
          await commonRequest
            .post(`/userauth/register`, others)
           .then(() => {
             resetForm()
             ToastSuccess();
              setTimeout(() => {
                history.push("/adminUserList");
              }, 2500);
            });
        } catch (err) {
         ToastError()
          console.log("Error updating user", err);
        }
      },
    });

  const formStyles = {
    background: "whitesmoke",
    boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37)",
    width: "90%",
    padding: "1.5rem",
    margin: "1.5rem 0",
    borderRadius: "1rem",
    fontSize: "1.1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  return (
    <>
      <AdminNav />

      <FormContainer>
        <Form style={formStyles} onSubmit={handleSubmit}>
          <h3
            style={{
              textAlign: "center",
              letterSpacing: "1.5px",
              color: "#4f2f5e",
            }}
          >
            <i className="fas fa-user-plus"></i> ADD USER
          </h3>
          <Form.Input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
            error={errors.username && touched.username && errors.username}
            fluid
            label="Username"
            placeholder="Username"
            id="username"
            name="username"
            type="text"
          />

          <Form.Input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            error={errors.email && touched.email && errors.email}
            fluid
            label="Email"
            placeholder="Email"
            id="email"
            name="email"
            type="text"
          />

          <Form.Input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            error={errors.password && touched.password && errors.password}
            fluid
            label="Password"
            placeholder="Password"
            id="password"
            name="password"
            type="password"
          />
          <Form.Input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.confirmPassword}
            error={
              errors.confirmPassword &&
              touched.confirmPassword &&
              errors.confirmPassword
            }
            fluid
            label="Confirm Password"
            placeholder="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
          />
          <Checkbox
            style={{ marginBottom: "2rem", fontSize: "1.2rem" }}
            label="Admin Access"
            checked={check ? (values.isAdmin = true) : (values.isAdmin = false)}
            onClick={(e) => setCheck(e.target.checked)}
            name="isAdmin"
            id="isAdmin"
          />
          <Button type="submit" style={{ color: "inherit" }} color="yellow">
            Add User
          </Button>
          <ToastContainer
            position="bottom-right"
            autoClose={3500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
          />
        </Form>
        <Button
          style={{ marginRight: "auto", marginLeft: "2rem" }}
          onClick={() => history.push("/adminUserList")}
          color="yellow"
        >
          Go to Users
        </Button>
      </FormContainer>
    </>
  );
};
