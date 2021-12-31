import styled from 'styled-components';
import { Navbar } from '../Components/Navbar';
import { Title } from './Home';
import { useHistory } from 'react-router-dom';
import FadeLoader from "react-spinners/FadeLoader";
import { useState} from 'react';
import logo from '../Assets/confirmation.jpg';
import { Button } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { medium } from '../responsive';

const Container = styled.div`
`;
const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const OrderContainer = styled.div`
display:flex;
align-items:center;
flex-direction:column;
justify-content:center;
color:#141e30;
font-size:1.3rem;
padding:1.5rem;
gap:0.2rem;
`

const ConfirmImage = styled.img`
width:16rem;
`
const Text = styled.h3`
font-size:2rem;
text-align:center;
font-family: 'Raleway', sans-serif;
${medium({fontSize:"1.5rem"})}
`



const Actions = styled.div`
display:flex;
justify-content:center;
gap:2rem;
align-items:center;
width:100%;
margin-top:2rem;
`

export const OrderPlaced = () => {


  let history = useHistory();
  const [loading, setLoading] = useState(true);
  let {currentUser
} = useSelector((state) => state.user);
setTimeout(()=>{
  setLoading(false)
},3500)

 return (

  <Container>
   <Navbar/>
     <Title >☑ Your Order Confirmation</Title>
     {!currentUser && history.push("/login")}
     {loading ?
       <LoaderContainer>
        <FadeLoader color="gold" loading={loading}  size={60} />
       </LoaderContainer>
       :

       <OrderContainer>
         <ConfirmImage src={logo}></ConfirmImage>
         <Text>Your Order has been placed successfully!</Text>
               <Actions>
         <Button color="yellow" onClick={()=>history.push("/")}>Home</Button>
           <Button color="yellow" onClick={()=>history.push("/orders")}>Track your order</Button>
           </Actions>
       </OrderContainer>

}
  </Container>

)


}
