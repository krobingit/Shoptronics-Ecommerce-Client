import styled from 'styled-components';
import { Navbar } from '../Components/Navbar';
import { Title } from './Home';
import { useLocation,useHistory } from 'react-router-dom';
import { SpinnerRoundFilled } from 'spinners-react';
import { useState} from 'react';
import logo from '../Assets/confirmation.jpg';
import { Button } from 'semantic-ui-react';

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
/*
const Summary = styled.div`
margin:1rem;
`
const Heading = styled.h2
`font-family: 'Raleway', sans-serif;
background:yellow;
text-transform:uppercase;
width:max-content;
border-radius:1rem;
padding:0.3rem;
`
const Products = styled.div`
background: rgba( 255, 255, 255, 0.25 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.5 );
border-radius: 10px;
border: 1px solid rgba( 255, 255, 255, 0.18 );
display:flex;
flex-direction:column;
flex-wrap:wrap;
margin-bottom:2rem;
`

const ProductCard = styled.div`
margin1.2rem;
padding:0.5rem;
display:flex;
gap:1.2rem;
align-items:center;
justify-content:space-evenly;
${medium({ flexDirection: "column", width: "22rem" })}

`

const ProductImage = styled.img`
width:13rem;
height:10rem;
object-fit:contain;
object-position:center center;
`

const ProductName = styled.h3`
width:15rem;
font-size:1.2rem;
`
const ProductQty = styled.h3``
const ProductPrice=styled.h3``


*/
export const OrderPlaced = () => {

  let location = useLocation();
  let history = useHistory();
  let { user,paymentData } = location.state;
  const [loading, setLoading] = useState(true);

setTimeout(()=>{
  setLoading(false)
},3500)

 return (

  <Container>
   <Navbar/>
  <Title style={{height:"3rem"}}>☑ Your Order Confirmation</Title>
     {loading ?
       <LoaderContainer>
         <SpinnerRoundFilled color="goldenrod" size="75" thickness={150}/>
       </LoaderContainer>
       :
       <OrderContainer>
         <ConfirmImage src={logo}></ConfirmImage>
         <Payment>Payment Successful!</Payment>
         <Text>Hi <OrderID>{paymentData.card.name}</OrderID>,Your Order with Order#  <OrderID>'{paymentData.order_id}'</OrderID> has been successfully placed!</Text>
         <Text>We are processing your items and shipping confirmation will be sent over <OrderID>{user.email}</OrderID>.</Text>
               <Actions>
         <Button color="yellow" onClick={()=>history.push("/")}>Home</Button>
           <Button color="yellow" onClick={()=>history.push("/orders")}>Track your order</Button>
           </Actions>
       </OrderContainer>

}
  </Container>

)


}

/*
*/