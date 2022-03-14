import { Navbar } from "../Components/Navbar";
import { useParams, useHistory } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { Form, Progress } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { commonRequest } from "../axiosreq";
import styled from "styled-components";
import { Button } from "semantic-ui-react";
import SyncLoader from "react-spinners/SyncLoader";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import app from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const ProfilePicEdit = styled.div`
  display: flex;
  gap: 1rem;
`;
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

const ProfilePic = styled.img`
  display: flex;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: 1rem;
  object-fit: cover;
`;

export const UserProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    try {
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
    } catch (err) {
      console.log("Error getting user info" + err);
    }
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
  const [userupdate, setUserUpdate] = useState(null);
  const [upload, setUpload] = useState(false);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState("");
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
  });
  //Upload Profile picture
  function handleImage(values) {
    setUpload(true);
    const storage = getStorage(app);
    const storageRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            console.log("File available at", downloadURL);
            setUpload(false);
            const User = {
              ...values,
              profile_img: downloadURL,
            };
            console.log(User);
            console.log(user._id);
            //api call
            commonRequest
              .put(`/user/${user?._id}`, User, {
                headers: { token: currentUser.token },
              })
              .then((res) => {
                setUserUpdate(res.data);
                ToastSuccess();
                setTimeout(() => {
                  history.push("/");
                }, 2500);
              });
          })
          .catch((err) => {
            console.log("Error updating user", err);
          });
      }
    );
  }
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    touched,
    values,
    setFieldValue,
  } = useFormik({
    initialValues: {
      username: user.username,
      email: user.email,
      profile_img: user?.profile_img || null,
    },
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      if (file) handleImage(values);
      else {
        try {
          await commonRequest
            .put(`/user/${user._id}`, values, {
              headers: { token: currentUser.token },
            })
            .then((res) => {
              setUserUpdate(res.data);
              ToastSuccess();
              setTimeout(() => {
                history.push("/");
              }, 2500);
            });
        } catch (err) {
          console.log("Error updating user", err);
        }
      }
    },
  });
  if (userupdate) {
    currentUser.username = userupdate.username;
    currentUser.email = userupdate.email;
    currentUser.profile_img = userupdate.profile_img;
  }
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
      <Navbar />
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
              <i className="fas fa-user-edit"></i> UPDATE PROFILE
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
              type="file"
              id="profile_img"
              name="profile_img"
              label="Profile Picture"
              onChange={(e) => {
                console.log(e.target.files);
                setFile(e.target.files[0]);
              }}
            />
            {values?.profile_img && (
              <ProfilePicEdit>
                <ProfilePic src={values.profile_img} alt="profile-picture" />
                <i
                  style={{ cursor: "pointer" }}
                  className="fad fa-trash-alt"
                  onClick={() => setFieldValue("profile_img", null)}
                ></i>
              </ProfilePicEdit>
            )}
            <Button type="submit" color="green">
              Update User
            </Button>
            {progress && upload && (
              <Progress
                percent={Math.round(progress)}
                inverted
                color="yellow"
                progress
                success={progress && progress > 80 && true}
              >
                Updating Profile Picture..
              </Progress>
            )}
            <ToastContainer
              position="bottom-right"
              autoClose={3500}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
            />
          </Form>
        </FormContainer>
      )}
    </>
  );
};
