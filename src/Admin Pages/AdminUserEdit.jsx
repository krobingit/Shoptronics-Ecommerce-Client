import { useParams, useHistory } from "react-router-dom";
import { AdminNav } from "../Components/AdminNavBar";
import * as yup from "yup";
import { useFormik } from "formik";
import { Form } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { commonRequest } from "../axiosreq";
import styled from "styled-components";
import { Button } from "semantic-ui-react";
import SyncLoader from "react-spinners/SyncLoader";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Checkbox } from "semantic-ui-react";

const LoaderContainer = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
`;
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

export const AdminUserEdit = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const getUser = async () => {
      await commonRequest
        .get(`/user/${id}`, {
          headers: {
            token: currentUser.token,
          },
        })
        .then((res) => setUser(res.data));
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    };
    getUser();
  }, [id, currentUser.token]);
  return (
    user && (
      <UpdateUser currentUser={currentUser} loading={loading} user={user} />
    )
  );
};

//conditional rendering --only when product has fetched the data, this function component will be returned
const UpdateUser = ({ loading, currentUser, user }) => {
  let history = useHistory();
  const [check, setCheck] = useState(user.isAdmin);
  const ToastSuccess = () => {
    return toast.success("User Details Updated Successfully", {
      position: "bottom-right",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      theme: "colored",
    });
  };
  const signUpSchema = yup.object({
    username: yup
      .string()
      .min(5, "Minimum 5 characters needed")
      .required("Username is mandatory"),
    email: yup.string().email().required("Please enter your Email"),
    isAdmin: yup.boolean(),
  });

  const { handleChange, handleSubmit, handleBlur, errors, touched, values } =
    useFormik({
      initialValues: {
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      validationSchema: signUpSchema,
      onSubmit: async (values) => {
        console.log(values);
        try {
          await commonRequest
            .put(`/user/${user._id}`, values, {
              headers: { token: currentUser.token },
            })
            .then(() => {
              ToastSuccess();
              setTimeout(() => {
                history.push("/adminUserList");
              }, 2500);
            });
        } catch (err) {
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
      {loading ? (
        <LoaderContainer>
          <SyncLoader
            loading={loading}
            margin="5px"
            color="#FFEC03"
            size={18}
          />
        </LoaderContainer>
      ) : (
        <FormContainer>
          <Form style={formStyles} onSubmit={handleSubmit}>
            <h3
              style={{
                textAlign: "center",
                letterSpacing: "1.5px",
                color: "#4f2f5e",
              }}
            >
              <i className="fas fa-user-edit"></i> UPDATE USER
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

            <Checkbox
              style={{ marginBottom: "2rem", fontSize: "1.2rem" }}
              label="Admin Access"
              checked={
                check ? (values.isAdmin = true) : (values.isAdmin = false)
              }
              onClick={(e) => setCheck(e.target.checked)}
              name="isAdmin"
              id="isAdmin"
            />
            <Button type="submit" color="green">
              Update User
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
      )}
    </>
  );
};
