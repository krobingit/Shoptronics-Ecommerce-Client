import styled from 'styled-components';
import loginpic from '../Assets/banners/loginpic.png';
import { Form } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import * as yup from 'yup';
import { useFormik } from "formik";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { useHistory } from 'react-router-dom';
import { medium } from '../responsive';
import LockResetIcon from '@mui/icons-material/LockReset';
import {  useState } from 'react';
import Loader from "react-loader-spinner";
import axios from 'axios';
import { API_URL } from '../globalconstant';

//styled components
const Container = styled.div`
background-image: linear-gradient(to right top, #12100e, #251a18, #37222a, #3d2e46, #2b4162);
background-size:cover;
display:flex;
min-height:100vh;
justify-content:center;
align-items:center;
`
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
  ${medium({ flexDirection:"column-reverse",
    height: "min-content"})}

    }
`
const Info = styled.div`
background:biege;
display:flex;
flex-direction:column;
align-items:center;
padding:1rem;
margin-top:2rem;
:hover{

}
`
const ForgetContainer = styled.div`
width:60%;
background:white;
padding:1rem;
 ${medium({ width: "100%" })};
`
const InfoImage = styled.img`
width:75%;
height:20rem;
 ${medium({width:"82%"})}
`
const Para = styled.p`
font-size:1.2rem;
margin:1rem 0 0 0;
text-align:center;
font-family: 'Poppins', sans-serif;
font-weight:600;
`
const Heading = styled.h3`
font-size: 2.2rem;
letter-spacing:2px;
text-align:center;
font-family: 'Patua One', cursive;
color:#4f2f5e;
`

const FormActions = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
margin-bottom:1.5rem`

const Initial = styled.span`
color:gold;
`
const Copy = styled.p`
color:grey;

`
function ForgotPassword() {

 const [info, setInfo] = useState(null);
 const [loading, setLoading] = useState(false);
 const history = useHistory();


 const ForgetPassSchema =
  yup.object({
   email: yup.string().email().required('Please enter your Email'),

  });


 const { handleChange, handleSubmit, handleBlur, errors, touched, values } = useFormik({

  initialValues: {
   email: "",
   password: ""
  },
  validationSchema: ForgetPassSchema,
   onSubmit: async (values,{resetForm}) => {
     setLoading(true);
     try {
       const { request} = await axios.post(`${API_URL}resetPassword/resetToken`, values);
       console.log(request);
       resetForm();
       setInfo("Password Reset Link has been sent to your mail. Please Check it out");
     }
catch(err){
setInfo("The Email you entered does not exist")

     }
 setLoading(false);
  }


 })
 const formStyles = {
  boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37)",
  padding: "2rem",
  borderRadius: "1rem",
  margin: "1.5rem 0.5rem 1.5rem 0.5rem",
  }

 return (

   <Container>

   <CenterContainer>
    <Info>
     <InfoImage src={loginpic}>
         </InfoImage>

     <Para>
      Get Access to your Orders,Wishlist and Recommendations
     </Para>
     <Para style={{ color: "#4f2f5e" }}>
      New here? Sign up <KeyboardDoubleArrowDownIcon />
     </Para>
         <Button style={{ marginTop: "3rem", width: "80%", fontSize: "1rem",color: "#4f2f5e",fontFamily: "Rubik, sans-serif" }} onClick={()=>{history.push("/register")}} color="yellow">SIGN UP</Button>

</Info>
    <ForgetContainer>
     <Heading>
      <i className="fas fa-bolt" style={{color:"gold"}}></i> <Initial>S</Initial>hoptronic<Initial>s</Initial>
     </Heading>
     <Form style={formStyles} onSubmit={handleSubmit} >
      <h3 style={{ textAlign: "center", letterSpacing: "1.5px", color: "#4f2f5e" }}><LockResetIcon
       /> RESET PASSWORD</h3>
      <Form.Input onChange={handleChange} onBlur={handleBlur} value={values.email}
       error={errors.email && touched.email && errors.email}
       fluid
       label='Email/Username'
       placeholder='Email/Username'
       id='email'
       name="email"
       type="text"
      />
      <FormActions>
       <Button type='submit' style={{ marginTop: "1rem", width: "80%", color: "#4f2f5e", fontSize: "1rem",fontFamily: "Rubik, sans-serif", borderRadius: "1rem" }} color="yellow">Send Mail</Button>
      {loading ? <><Loader type="Oval" color="crimson" height={50} width={30} />
           <p style={{ color: "purple" }}>Please wait..</p></> : ''}
         {info ? <p style={{color: info.length>37 ? "blue" : "red",marginTop:"1rem",textAlign:"center"}}>{info}</p>: '' }
           </FormActions>
      <hr />
      <p style={{ fontSize: "1rem",textAlign:"center",fontWeight: "600", color: "#4f2f5e" }}>Note: Please enter your existing email address with us to receive password reset link</p>
       <p style={{ color: "#4f2f5e",cursor:"pointer",fontWeight: "bold" }} onClick={() => { history.push("/login") }}>↩ Back to Login</p>
         <Copy>  © 2021 Shoptronics</Copy>
     </Form>
    </ForgetContainer>
   </CenterContainer>

  </Container>



 )




}
export { ForgotPassword }
