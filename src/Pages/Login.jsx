//imports
import styled from 'styled-components';
import loginpic from '../Assets/banners/loginpic.png';
import { Form } from 'semantic-ui-react';
import * as yup from 'yup';
import { useFormik } from "formik";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { useHistory } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { medium,small } from '../responsive';
import { useState } from 'react';
import { login } from '../Actions/login_actions';
import cartlit from '../Assets/cart-lightening.png';
import { useSelector } from "react-redux";
import GoogleSignInButton from './GoogleButton';
//styled-components
const Container = styled.div`
background-image: linear-gradient(to right top, #12100e, #251a18, #37222a, #3d2e46, #2b4162);
background-size:cover;
display:flex;
justify-content:center;
flex-wrap:wrap;
align-items:center;
min-height:100vh;

`
const CenterContainer = styled.div`
width:65rem;
box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
background:white;
border-radius:1rem;
overflow:hidden;
display:flex;
flex-direction:row;
margin:1.1rem;
  ${medium({
  flexDirection: "column-reverse",
  height: "min-content"
})}

    }
`
const Info = styled.div`
background:biege;
display:flex;
flex-direction:column;
align-items:center;
padding:1rem;
`
const LoginContainer = styled.div`
width:60%;
background:white;
padding:1rem;
 ${medium({ width: "100%" })};
`
const InfoImage = styled.img`
width:75%;
height:20rem;
 ${medium({ width: "82%" })}
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
gap:1rem;
align-items:center;
justify-content:center;
margin-bottom:1.5rem`

const SocialMediaIcons = styled.div`
display:flex;
justify-content:space-around;
margin:1rem 0 0 0;
`
const Initial = styled.span`
color:gold;
`
const Copy = styled.p`
color:grey;
`
const ErrorMsg = styled.p`
font-size:1rem;
color:red;
`

const CartLit = styled.div`
background:url(${cartlit});
width:10rem;
display:inline-flex;
height:10rem;
background-size:cover;
${small({ display: "none" })};
${medium({display:"none"})};
`
const Demo = styled.div`
font-size:1.1rem;
color:red;
margin-bottom:1rem;
font-weight:bold;
${small({fontSize:"0.9rem"})}
`;
//Login Component
function Login() {
  //const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const user = useSelector(state => state.user);

  if (user.currentUser) {
    if(user.currentUser.isAdmin)
      history.push("/adminHome")
      else history.push("/")

  }

  const signInSchema =
    yup.object({
      email: yup.string().required('Email/Username is required'),
      password: yup.string().required('Password cannot be empty')

    });


  const { handleChange, handleSubmit, handleBlur, errors, touched, values } = useFormik({

    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: signInSchema,
    onSubmit: async (values) => {
      setLoading(true);
      let isUserTrue = await login(dispatch, values);
      setLoading(false);
      if (!isUserTrue)
        setErr(true);
      }

    }
  )
  const formStyles = {
    boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37)",
    padding: "2rem",
    borderRadius: "1rem",
    margin: "1.5rem 0.5rem 1.5rem 0.5rem",
  }
  
  const googleAuth=()=>{
    window.open("https://shoptronics-ecom.onrender.com/auth/google", "_self");
  }
  /* const fbAuth=()=>{
    window.open("http://localhost:7000/auth/facebook", "_self");
  } */
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
          <Button style={{
            margin: "2rem 0", color: "#4f2f5e", width: "80%", fontSize: "1rem", fontFamily: "Rubik, sans-serif"
            , borderRadius: "1rem"
          }} onClick={() => { history.push("/register") }} color='yellow'>SIGN UP</Button>
 <Demo>
              <p>For Demo,Please Use below credentials</p>
             <p><b>User</b>: dummy@gmail.com & <b>Password</b>:Demo@123</p>
            <p><b>Admin</b>: admin@gmail.com & <b>Password</b>:Admin@123</p>
            </Demo>
        </Info>
        <LoginContainer>
          <Heading>
            <i className="fas fa-bolt" style={{ color: "gold" }}></i> <Initial>S</Initial>hoptronic<Initial>s</Initial>
          </Heading>
          <Form style={formStyles} onSubmit={handleSubmit} >
            <h3 style={{ textAlign: "center", letterSpacing: "1.5px", color: "#4f2f5e", fontWeight: "bold" }}>LOGIN</h3>
            <Form.Input onChange={handleChange} onBlur={handleBlur} value={values.email}
              error={errors.email && touched.email && errors.email}
              fluid
              label='Email/Username'
              placeholder='Registered Email or Username'
              id='email'
              name="email"
              type="text"
            />
            <Form.Input onChange={handleChange} onBlur={handleBlur} value={values.password}
              error={errors.password && touched.password && errors.password}
              fluid
              label='Password'
              placeholder='Password'
              id="password"
              name="password"
              type="password"
            />
            <p onClick={() => { history.push("/forgotPassword") }} style={{ color: "#4f2f5e", fontWeight: "bold", cursor: "pointer" }}>Forgot Password?</p>
            <FormActions>
              <Button loading={loading} type="submit" style={{ marginTop: "1rem", width: "80%", color: "#4f2f5e", fontSize: "1rem", fontFamily: "Rubik, sans-serif", borderRadius: "1rem" }} color='yellow'
              >SIGN IN</Button>

              {err && <ErrorMsg>Invalid Credentials</ErrorMsg>}
            </FormActions>
            <hr />
            <p style={{ fontSize: "1rem", fontWeight: "600", color: "#4f2f5e" }}>Or Sign up using</p>
            <SocialMediaIcons>
             {/*  <button type="button" className="ui circular facebook icon button">
                <i className="facebook icon"></i>
              </button>
              <button type="button" className="ui circular twitter icon button">
                <i className="twitter icon"></i>
              </button>
              <button type="button" className="ui circular google plus icon button" onClick={googleAuth}>
                <i className="google plus icon"></i>
              </button> */}
              <GoogleSignInButton onClick={googleAuth}/>
            </SocialMediaIcons>
            <Copy>  © 2021 Shoptronics</Copy>

          </Form>
        </LoginContainer>
      </CenterContainer>
<CartLit></CartLit>
    </Container>



  )




}
export { Login }
