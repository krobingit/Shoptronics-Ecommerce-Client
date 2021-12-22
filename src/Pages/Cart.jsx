import { CartList } from "../Components/CartList";
import { Navbar } from "../Components/Navbar";
import styled from 'styled-components';
import {  small } from "../responsive";
import { Button } from "semantic-ui-react";
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import cart from '../Assets/cartEmpty.png'
import { DisplayRazorPayCheckout } from "./Payment";
const Title = styled.h1`
font-size:1.8rem;
text-align:center;
margin:0 0 2rem 0;
text-shadow:1.5px 1px #141e30;
color:gold;
letter-spacing:3px;
background:black;
font-family: 'Fira Sans', sans-serif;
${small({fontSize:"1.5rem"})};
`
const Container = styled.div`
padding:2rem;

`
const CartEmptyContainer = styled.div`
margin-top:2rem;
display:flex;
flex-direction:column;
align-items:center;
`
const CartEmptyImage = styled.img`
width:20rem;
`
const CartTotals = styled.div`
margin:1rem;
width:90%;
padding:1rem;
display:flex;
flex-direction:column;
`
const SubTotal = styled.div`
display:flex;
justify-content:space-between;
align-items:center;
`
const Shipping= styled.div`
display:flex;
justify-content:space-between;
align-items:center;
`
const ShippingMinus= styled.div`
display:flex;
justify-content:space-between;
align-items:center;
`
const Total= styled.div`
display:flex;
justify-content:space-between;
align-items:center;
`
const CartDetails= styled.div`
display:flex;
flex-direction:column;
row-gap:1rem;
margin-bottom:1rem;
`
const Line = styled.div`
border:1px solid darkgray;
margin-bottom:0.5rem;
`
export const Cart = () => {
 const history = useHistory();
  const { products, total } = useSelector(state => state.cart);
   const { currentUser } = useSelector(state => state.user);
 return (
  <>
   <Navbar />
   <Title>CART</Title>
   <Button style={{ marginLeft: "3rem" }} color="yellow" onClick={() => history.push("/products")}>Continue to Shop</Button>
   <Container>
    {products.length > 0 ?
     <>
     <CartList />
     <CartTotals>
             <h2 style={{color:"black"}}>CART TOTALS</h2>
             <Line></Line>
             <CartDetails>
<SubTotal>
                 <h3>SubTotal</h3>
                 <h3 style={{margin:"0",color:"black"}}>₹{total}</h3>
               </SubTotal>
                   <Line></Line>
             <Shipping>
                 <h3>Estimated Shipping</h3>
                 <h3 style={{margin:"0"}}>₹100</h3>
               </Shipping>
                   <Line></Line>
             <ShippingMinus>
                 <h3>Shipping Discount</h3>
                 <h3 style={{margin:"0"}}>-₹100</h3>
               </ShippingMinus>
                   <Line></Line>
             <Total>
                 <h3>Total Amount to be Paid</h3>
                 <h3 style={{margin:"0",fontSize:"1.3rem",color:"#141e30"}}>₹{total}</h3>
               </Total>
               </CartDetails>
             <Button inverted color="yellow" style={{ fontSize: "1.3rem", color: "black" }}
  onClick={()=>DisplayRazorPayCheckout(total,currentUser.username)}>Proceed to Checkout</Button>

      </CartTotals>
      </>
     :
     <CartEmptyContainer>
      <h3 style={{ textAlign: "center",margin:"1rem",color:"#141e30" }}>Your Shoptronics Cart is Empty.Let's add some items..</h3>
      <CartEmptyImage src={cart}/>
</CartEmptyContainer>}
    </Container>
  </>

)



}