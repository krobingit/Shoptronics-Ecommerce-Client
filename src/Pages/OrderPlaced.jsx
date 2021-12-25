import styled from 'styled-components';
import { Navbar } from '../Components/Navbar';
import { Title } from './Home';
import { useLocation,useHistory } from 'react-router-dom';
import { SpinnerRoundFilled } from 'spinners-react';
import { useState} from 'react';
import logo from '../Assets/confirmation.jpg';
import { Button } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

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
`
const OrderID = styled.span`
color:green;
`
const ConfirmImage = styled.img`
width:10rem;
`
const Text = styled.h3`
font-family: 'Bitter', serif;
`
const Payment = styled.h3`
font-family: 'Raleway', sans-serif;
font-size:1.6rem;
text-shadow:1px 1px gold;
`


const Actions = styled.div`
display:flex;
justify-content:center;
gap:2rem;
align-items:center;
width:100%;
`

export const OrderPlaced = () => {

  let location = useLocation();
  let history = useHistory();
  let {  paymentData } = location.state;
  const [loading, setLoading] = useState(true);
  let {currentUser
} = useSelector((state) => state.user);
setTimeout(()=>{
  setLoading(false)
},3500)

 return (

  <Container>
   <Navbar/>
     <Title style={{ height: "3rem" }}>☑ Your Order Confirmation</Title>
     {!currentUser && history.push("/login")}
     {loading ?
       <LoaderContainer>
         <SpinnerRoundFilled color="goldenrod" size="75" thickness={150}/>
       </LoaderContainer>
       :
       <OrderContainer>
         <ConfirmImage src={logo}></ConfirmImage>
         <Payment>Payment Successful!</Payment>
         <Text>Hi <OrderID>{paymentData.card.name}</OrderID>,Your Order with Order#  <OrderID>'{paymentData.order_id}'</OrderID> has been successfully placed!</Text>
         <Text>We are processing your items and shipping confirmation will be sent over <OrderID>{currentUser.email}</OrderID>.</Text>
               <Actions>
         <Button color="yellow" onClick={()=>history.push("/")}>Home</Button>
           <Button color="yellow" onClick={()=>history.push("/orders")}>Track your order</Button>
           </Actions>
       </OrderContainer>

}
  </Container>

)


}
