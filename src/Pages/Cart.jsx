import { CartList } from "../Components/CartList";
import { Navbar } from "../Components/Navbar";
import styled from "styled-components";
import { Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import cart from "../Assets/cartEmpty.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Title } from "./Home";
import logo from '../Assets/logo.jpg';
import axios from 'axios';
import razorpay from '../Assets/razorpay.png';
import { small,medium } from '../responsive';
import { API_URL } from '../globalconstant';


const Container = styled.div`
  padding: 2rem;
`;
const CartEmptyContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CartEmptyImage = styled.img`
  width: 20rem;
`;
const CartTotals = styled.div`
  margin: 1rem;
  width: 90%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;
const SubTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Discount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Shipping = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ShippingMinus = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Total = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  align-items: center;
`;
const CartDetails = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  margin-bottom: 1rem;
`;
const Line = styled.div`
  border: 1px dashed darkgray;
  margin-bottom: 0.5rem;
`;
const Demo = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  color: crimson;
  font-size: 1.2rem;
  margin: 1.5rem 0;
`;
const RazorPay = styled.img`
width:40rem;
object-position:center center;
${medium({width:"35rem"})}
${small({width:"25rem"})}
`

const Pay = styled.div`
display:flex;
flex-direction:column;
margin-top:1rem;
align-items:center;
`
//Function to Load Razorpay script
 function loadRazorPay(src)
{
 return new Promise((resolve) => {
  const script = document.createElement('script')
  script.src = src;
  script.onload = () => {
   resolve(true);
  }
  script.onerror = () => {
   resolve(false);

  }
  document.body.appendChild(script);
 })
}


const toasterr = () => {
  return toast.error("Please Log in to Complete the Checkout", {
    position: "bottom-right",
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    theme: "colored",
  });
};
export const Cart = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { products, total, quantity } = useSelector((state) => state.cart);

  let quantityDiscount = products
    .map((prod) => prod.quantity)
    .reduce((total, val) => val + total, 0);

  const { currentUser } = useSelector((state) => state.user);
  //Function to display RazorPay frontend Payment Gateway integration
async function DisplayRazorPayCheckout() {
 const result = await loadRazorPay("https://checkout.razorpay.com/v1/checkout.js");
 if (!result) {
  alert("Razorpay failed")
return
 }
 const res = await axios.post(`${API_URL}razorpay`,
  {total}
 )

  console.log(res.data)

 var options = {
  key: 'rzp_test_2I9iqbhqh8BDIH', // Enter the Key ID generated from the Dashboard
  "amount": res.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  "currency": res.data.currency,
  "name": "Shoptronics Order",
  "description": `More Power to you ⚡`,
  "image": logo,
 payment_capture: 1,
   "order_id": res.data.id,//This is a sample Order ID. Pass the `id` obtained in the response of Step 1
   "handler": async function (response) {
     console.log(response.razorpay_signature);
   try {
         const paymentId = response.razorpay_payment_id;
         const url = `${API_URL}razorpay/capture/${paymentId}`;
     const captureResponse = await axios.post(url, {
       "amount": res.data.amount,
       "currency":res.data.currency
     })
         const razpaydata = JSON.parse(captureResponse.data)
         const captured = razpaydata.captured;
         console.log(razpaydata)
         if(captured){
             console.log('success')
     }
     dispatch({ type: "EmptyCart" })
     //Creation of order to the server
   async function PostOrder() {

      await axios.post(`${API_URL}order`,
        {
          userId: currentUser._id,
          userEmail:currentUser.email,
          products,
          paymentData:razpaydata,
          orderStatus:"Processing"
        },
        {
          headers: {token: currentUser.token }
        }
      )
     }
     await PostOrder();
     //redirecting to order confirmation page
     history.push(`/order-placed/${razpaydata.order_id}`)

   }
   catch (err) {
          console.log(err);
        }
   },
  "prefill": {
    "name": currentUser.username
   },
   "notes": {
     "address":"149, New No 60, Coral Merchant Street,Chennai-600073,TN,India"
   }
 };
  var paymentObject = new window.Razorpay(options);
  return(
 paymentObject.open())
  }
  /*      Payment function ends               */



  return (
    <>
      <Navbar tab="cart" />
      <Title><i className="fas fa-cart-arrow-down"></i> CART{quantity > 0 && `(${quantity})`}</Title>
      <Button
        style={{ marginLeft: "3rem" }}
        color="yellow"
        onClick={() => history.push("/products")}
      >
        Continue to Shop
      </Button>
      <Container>
        {products.length > 0 ? (
          <>
            <CartList />
            <CartTotals>
              <h2 style={{ color: "black" }}>CART TOTALS</h2>
              <Line></Line>
              <CartDetails>
                <SubTotal>
                  <h3>SubTotal{quantity > 0 && `(${quantity} items)`}</h3>
                  <h3 style={{ margin: "0", color: "black" }}>
                    ₹{(total + quantityDiscount * 10000).toLocaleString()}
                  </h3>
                </SubTotal>
                <Discount>
                  <h3>Discount</h3>
                  <h3 style={{ margin: "0", color: "green" }}>
                    - ₹{(quantityDiscount * 10000).toLocaleString()}
                  </h3>
                </Discount>

                <Shipping>
                  <h3>Estimated Shipping</h3>
                  <h3 style={{ margin: "0" }}>₹100</h3>
                </Shipping>

                <ShippingMinus>
                  <h3>Shipping Discount</h3>
                  <h3 style={{ margin: "0", color: "green" }}>-₹100</h3>
                </ShippingMinus>
                <Line></Line>
                <Total>
                  <h3>Total Amount to be Paid</h3>
                  <h3
                    style={{
                      margin: "0",
                      fontSize: "1.4rem",
                      color: "black",
                    }}
                  >
                    ₹{total.toLocaleString()}
                  </h3>
                </Total>
                <Line></Line>
              </CartDetails>
              {!currentUser ? (
                <>
                  <Button
                    color="yellow"
                    onClick={toasterr}
                    style={{ fontSize: "1.3rem", color: "black" }}
                  >
                    Proceed to Checkout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    color="yellow"
                    style={{ fontSize: "1.3rem", color: "black" }}
                    onClick={() => {
                      return DisplayRazorPayCheckout() //displays a razor pay sub-page
                    }}
                  >
                    Proceed to Checkout
                    </Button>
                    <Pay>
<RazorPay src={razorpay}></RazorPay>
                  <Demo>
                    <h3 style={{ textDecoration: "underline" }}>NOTE:</h3>
                        <p>
                      Use "UPI" and enter UPI ID "success@razorpay"
                          for successful checkout </p>
                        <p>[OR]</p>
                     <p> Use "Card" Option and  below credentials for checkout and choose{" "}
                      <b>Payment Success</b> at the final page
                    </p>
                    <p>
                      Card number: <b>4111111111111111</b>
                    </p>
                    <p>
                      Expiry:<b> 01/22 or any future dates</b>
                    </p>
                    <p>
                      CVV:<b> any three digit number</b>
                    </p>
                      </Demo>
                      </Pay>
                </>
              )}
            </CartTotals>
          </>
        ) : (
          <CartEmptyContainer>
            <h3
              style={{ textAlign: "center", margin: "1rem", color: "#141e30" }}
            >
              Your Shoptronics Cart is Empty.  Let's add some items..What say?
            </h3>
            <CartEmptyImage src={cart} />
          </CartEmptyContainer>
        )}

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
  );
};
