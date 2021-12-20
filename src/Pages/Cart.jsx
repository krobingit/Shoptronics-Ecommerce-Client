import { CartList } from "../Components/CartList";
import { Navbar } from "../Components/Navbar";
import styled from 'styled-components';
import {  small } from "../responsive";
import { Button } from "semantic-ui-react";
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import cart from '../Assets/cartEmpty.png'
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
border:2px solid grey;
`
export const Cart = () => {
 const history = useHistory();
 const { products } = useSelector(state => state.cart);
 return (
  <>
   <Navbar />
   <Title>Cart</Title>
   <Button style={{ marginLeft: "3rem" }} color="yellow" onClick={() => history.push("/products")}>Continue to Shop</Button>
   <Container>
    {products.length > 0 ?
     <>
     <CartList />
     <CartTotals>
       <h1 style={{textAlign:"center"}}>CART TOTALS</h1>
<p>hello</p>

      </CartTotals>
      </>
     :
     <CartEmptyContainer>
      <h3 style={{ textAlign: "center",margin:"1rem",color:"#141e30" }}>Your Shoptronics Cart is Empty.Add items to it now</h3>
      <CartEmptyImage src={cart}/>
</CartEmptyContainer>}
    </Container>
  </>

)



}