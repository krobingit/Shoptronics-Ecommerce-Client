import styled from 'styled-components';
import { Button } from 'semantic-ui-react';
import { Form } from 'semantic-ui-react';
import { medium,large } from '../responsive';
import * as yup from 'yup';
import { useFormik } from "formik";
import { useHistory } from 'react-router-dom';
import ship from '../Assets/shipping.png'
import { API_URL } from '../globalconstant';
import { useState } from 'react';

const MainContainer = styled.div`
background-image: linear-gradient(to right top, #12100e, #251a18, #37222a, #3d2e46, #2b4162);
background-size:cover;
display:flex;
justify-content:center;
align-items:center;
min-height:100vh;

`
const SignupContainer = styled.div`
width:50%;
background:white;
padding:0.8rem 0;
margin:2rem 0;
display:flex;
flex-direction:column;
align-items:center;
box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
border-radius:1rem;
 ${large({ width: "65%" })}
 ${medium({ width: "90%" })}
`
const Heading = styled.h3`
font-size: 1.8rem;
letter-spacing:2px;
text-align:center;
margin:0.7rem 0 0 0;
font-family: 'Patua One', cursive;
color:#4f2f5e;
`

const Initial = styled.span`
color:gold;
`
const FormActions = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
margin-bottom:1.5rem;
gap:1rem;`

const Actions = styled.div`
display:flex;
flex-direction:row;
justify-content:space-between;
`

const Images = styled.div`
display:flex;
flex-direction:row;
align-items:center;
`
const Shipping = styled.img`
object-fit:fill;
width:11rem;
height:6rem;
mix-blend-mode: multiply;
`
const ShippingContainer = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-conent:center;
`
const ShippingText = styled.p`
margin:0 0.7rem;
color:#4f2f5e;
font-size:1.2rem;
border-radius:0.5rem;
padding:0 0.2rem;
text-align:center;
font-family: 'Patua One', cursive;
letter-spacing:1.2px;
`
const Copy = styled.p`
color:grey;

`

function Register() {
  const history = useHistory();
   const [info, setInfo] = useState(null);
 const [loader, setLoader] = useState(false);
  const formStyles = {
  background: 'whitesmoke',
    boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37)",
  width:"90%",
    padding: "1.5rem",
    margin: "1.5rem",
  borderRadius: "1rem"
 }
 const signUpSchema =
  yup.object({
   username: yup.string().min(5, "Minimum 5 characters needed").required('Username is mandatory'),
   email: yup.string().email().required('Please enter your Email'),
   password: yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/, "Password must be eight characters or more including one uppercase letter,one lowercase letter, ,one number,one special character").required('Please enter your new password'),
 confirmPassword: yup.string()
      .oneOf([yup.ref('password'), null], 'Passwords must match').required("Required Field")

  });

 const { handleChange, handleSubmit, handleBlur, errors, touched, values } = useFormik({

  initialValues: {
   username: "",
   email: "",
   password: "",
     confirmPassword: ""
  },
  validationSchema: signUpSchema,
   onSubmit: (values, { resetForm }) => {

     setLoader(true);
   const { confirmPassword, ...others } = values;

    const req = fetch(`${API_URL}/userauth/register`,
     {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify(others)
     }).then((response) => {

    //  console.log(response)
      if (response.status === 400)
      {
       setLoader(false)
       setInfo("Username/Email already exists")
      }
      else
      {
 setLoader(false)
setInfo(`Hi ${others.username},Your account has been created successfully! Please Login with your Email/Password`)
    resetForm();
}

     })
console.log(req)
  }


 })
  return (

    <MainContainer>

      <SignupContainer>
        <Images>
          <ShippingContainer>
            <Shipping src={ship}></Shipping>
            <ShippingText>✅Free Shipping for orders above ₹1000!!</ShippingText>
</ShippingContainer>
        </Images>
            <hr
        style={{
          width:"80%"
        }}
    />
  <Heading>
     <i className="fas fa-bolt" style={{ color: "gold" }}></i> <Initial>S</Initial>hoptronic<Initial>s</Initial>
    </Heading>
   <Form style={formStyles} onSubmit={handleSubmit}>
          <h3 style={{ textAlign: "center", letterSpacing: "1.5px", color: "#4f2f5e" }}><i className="fas fa-user-circle"></i> CREATE AN ACCOUNT</h3>
  <Form.Input onChange={handleChange} onBlur={handleBlur} value={values.username}
   error={ errors.username && touched.username && errors.username}
   fluid
   label='Username'
   placeholder='Username'
   id='username'
   name="username"
   type ="text"
   />

   <Form.Input onChange={handleChange} onBlur={handleBlur} value={values.email}
   error={ errors.email && touched.email && errors.email}
   fluid
   label='Email'
   placeholder='Email'
   id='email'
   name="email"
   type ="text"
   />

   <Form.Input onChange={handleChange} onBlur={handleBlur} value={values.password}
   error={ errors.password && touched.password && errors.password}
   fluid
   label='Password'
   placeholder='Password'
   id="password"
   name="password"
   type ="password"
    />
     <Form.Input onChange={handleChange} onBlur={handleBlur} value={values.confirmPassword}
   error={ errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
   fluid
   label='Confirm Password'
   placeholder='Confirm Password'
   id="confirmPassword"
   name="confirmPassword"
   type ="password"
     />
    <FormActions>
            <Button loading={loader} type="submit" style={{color: "#4f2f5e", marginTop: "1rem", width: "80%", fontSize: "1rem",fontFamily: "Rubik, sans-serif", borderRadius: "1rem" }} color='yellow'>SIGN UP</Button>

    {info ? <p
     style={{ color: info.length>40 ? "blue" : "red",textAlign:"center" }}>{info}</p> : ''}

          </FormActions>
          <Actions>
          <p  style={{ color: "#4f2f5e",cursor:"pointer",fontWeight: "bold" }} onClick={() => { history.push("/login") }}>↩ Back to Login</p>
<p style={{ color: "#4f2f5e", cursor:"pointer",fontWeight: "bold" }} onClick={() => { history.push("/") }}>↩ Back to Home</p>
        </Actions>
 <Copy>  © 2021 Shoptronics</Copy>
   </Form>
   </SignupContainer>
   </MainContainer>
 )
}

export {Register}