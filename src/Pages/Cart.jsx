import { CartList } from "../Components/CartList";
import { Navbar } from "../Components/Navbar";
import styled from 'styled-components';
import {  small } from "../responsive";
import { Button } from "semantic-ui-react";
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import cart from '../Assets/cartEmpty.png'
import { DisplayRazorPayCheckout } from "./Payment";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Title = styled.h1`
font-size:1.8rem;
text-align:center;
margin:0 0 2rem 0;
text-shadow:1.5px 1px #141e30;
color:gold;
letter-spacing:3px;
background:linear-gradient(135deg, #121721 0%, #000000 100%) fixed;
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
const Discount = styled.div`
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
gap:1.5rem;
align-items:center;
`
const CartDetails= styled.div`
display:flex;
flex-direction:column;
row-gap:1rem;
margin-bottom:1rem;
`
const Line = styled.div`
border:1px dashed darkgray;
margin-bottom:0.5rem;
`
const Demo = styled.div`
display:flex;
justify-content:center;
flex-direction:column;
align-items:flex-start;
color:crimson;
font-size:1.2rem;
margin:1.5rem 0;
`


const toasterr = () => {
return(toast.error('Please Log in to Complete the Checkout', {
position: "bottom-right",
autoClose: 3500,
hideProgressBar: false,
closeOnClick: true,
theme: "colored"
}));
}
export const Cart = () => {
  const history = useHistory();

  const { products, total, quantity } = useSelector(state => state.cart);
  let quantityDiscount = products.map((prod) => prod.quantity).reduce((total,val)=>val+total,0)
  const { currentUser } = useSelector(state => state.user);
 return (
  <>
   <Navbar />
     <Title>CART{quantity>0 && `(${quantity})`}</Title>
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
                 <h3>SubTotal{quantity>0 && `(${quantity} items)`}</h3>
                 <h3 style={{ margin: "0", color: "black" }}>₹{(total+quantityDiscount*10000).toLocaleString()}</h3>
               </SubTotal>
                   <Discount>
                 <h3>Discount</h3>
                 <h3 style={{ margin: "0", color: "green" }}>- ₹{(quantityDiscount*10000).toLocaleString()}</h3>
               </Discount>

             <Shipping>
                 <h3>Estimated Shipping</h3>
                 <h3 style={{margin:"0"}}>₹100</h3>
               </Shipping>

             <ShippingMinus>
                 <h3>Shipping Discount</h3>
                 <h3 style={{margin:"0",color:"green"}}>-₹100</h3>
               </ShippingMinus>
                   <Line></Line>
             <Total>
                 <h3>Total Amount to be Paid</h3>
                 <h3 style={{margin:"0",fontSize:"1.3rem",color:"black",textShadow:"2px 2px yellow"}}>₹{total.toLocaleString()}</h3>
               </Total>
               <Line></Line>

             </CartDetails>
             {!currentUser ?
               <>
                <Button color="yellow" onClick={toasterr} style={{ fontSize: "1.3rem", color: "black" }}>Proceed to Checkout</Button>
     <Demo>
                   <h3 style={{textDecoration:"underline"}}>NOTE:</h3>
                            <p>Please use the below credentials for checkout and choose <b>Payment Success</b> at the final page</p>
                            <p>Card number: <b>4111111111111111</b></p>
                            <p>Expiry:<b> 01/22 or any future dates</b></p>
                            <p>CVV:<b> any three digit number</b></p>


                 </Demo>
                 </>
               :
<Button color="yellow" style={{ fontSize: "1.3rem", color: "black" }}
                 onClick={() => { return DisplayRazorPayCheckout(total, currentUser,products) }}>Proceed to Checkout</Button>

             }

      </CartTotals>
      </>
     :
     <CartEmptyContainer>
      <h3 style={{ textAlign: "center",margin:"1rem",color:"#141e30" }}>Your Shoptronics Cart is Empty.Let's add some items..</h3>
      <CartEmptyImage src={cart}/>
         </CartEmptyContainer>}

       <ToastContainer
position="bottom-right"
autoClose={3500}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
/>
    </Container>
  </>

)



}