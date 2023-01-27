import styled from 'styled-components';
import { Button } from 'semantic-ui-react';
import { Form } from 'semantic-ui-react';
import { medium,large } from '../responsive';
import * as yup from 'yup';
import { useFormik } from "formik";
import { useHistory,useParams } from 'react-router-dom';
import ship from '../Assets/shipping.png'
import { API_URL } from '../globalconstant';
import {  useState } from 'react';
import Loader from "react-loader-spinner";
import axios from 'axios';

//styled components
const MainContainer = styled.div`
background-image: linear-gradient(to right top, #12100e, #251a18, #37222a, #3d2e46, #2b4162);
background-size:cover;
display:flex;
justify-content:center;
align-items:center;
min-height:100vh;

`
const ResetContainer = styled.div`
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
margin-bottom:1.5rem`

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
function ResetPassword() {
    const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
 const { userid, token } = useParams();
   const history = useHistory();
  const formStyles = {
  background: 'whitesmoke',
    boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37)",
  width:"90%",
    padding: "1.5rem",
    margin: "1.5rem",
  borderRadius: "1rem"
 }
 const resetSchema =
  yup.object({
   password: yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/, "Password must be eight characters or more including one uppercase letter,one lowercase letter, ,one number,one special character").required('Please enter your new password'),
 confirmPassword: yup.string()
      .oneOf([yup.ref('password'), null], 'Passwords must match').required("Required Field")

  });

 const { handleChange, handleSubmit, handleBlur, errors, touched, values } = useFormik({

  initialValues: {
   password: "",
     confirmPassword: ""
  },
  validationSchema: resetSchema,
   onSubmit: async (values, { resetForm }) => {
setLoading(true)
       const { password } = values;
    try {
      const response = await axios.post(`${API_URL}resetPassword/${userid}/${token}`,
        { password: password });
console.log(response)
      resetForm();
      setInfo("Password has been reset Successfully.😊")
    }
    catch (err)
    {
      setInfo("Invalid Link or Expired")
      setTimeout(() => { history.push("/login") },3500);
    }
setLoading(false)
      }

  })
  return (

    <MainContainer>

      <ResetContainer>
        <Images>
          <ShippingContainer>
            <Shipping src={ship}></Shipping>
            <ShippingText>✅Free Shipping for orders above $99!!</ShippingText>
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
          <h3 style={{ textAlign: "center", letterSpacing: "1.5px", color: "#4f2f5e" }}>RESET PASSWORD</h3>

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
   placeholder='Same Password As Above'
   id="confirmPassword"
   name="confirmPassword"
   type ="password"
     />
    <FormActions>
       <Button type='submit' style={{color: "#4f2f5e", marginTop: "1rem", width: "80%",fontFamily: "Rubik, sans-serif", fontSize: "1rem", borderRadius: "1rem" }} color='yellow'>RESET</Button>
           {loading ? <><Loader type="Oval" color="purple" height={50} width={30} />
           <p style={{ color: "purple" }}>Please wait..</p></> : ''}
         {info ? <p style={{color:info.length>24 ? "blue" : "red",marginTop:"1rem"}}>{info}</p>: '' }
          </FormActions>
          <Actions>
          <p  style={{ color: "#4f2f5e",cursor:"pointer",fontWeight: "bold" }} onClick={() => { history.push("/login") }}>↩ Back to Login</p>
<p style={{ color: "#4f2f5e", cursor:"pointer",fontWeight: "bold" }} onClick={() => { history.push("/") }}>↩ Back to Home</p>
        </Actions>
 <Copy>  © 2021 Shoptronics</Copy>
   </Form>
   </ResetContainer>
   </MainContainer>
 )
}

export {ResetPassword}
