
import logo from '../Assets/logo.jpg';
import axios from 'axios';
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

async function DisplayRazorPayCheckout(total, currentUser,products) {
  const products_names = products.map(prod => prod.name);

 const result = await loadRazorPay("https://checkout.razorpay.com/v1/checkout.js");
 if (!result) {
  alert("Razorpay failed")
return
 }
 const res = await axios.post("https://shoptronics-ecommerce.herokuapp.com/razorpay",
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
         const url = `https://shoptronics-ecommerce.herokuapp.com/razorpay/capture/${paymentId}`;
     const captureResponse = await axios.post(url, {
       "amount": res.data.amount,
       "currency":res.data.currency
     })
         const successObj = JSON.parse(captureResponse.data)
         const captured = successObj.captured;
         console.log(successObj)
         if(captured){
             console.log('success')
         }
   }
   catch (err) {
          console.log(err);
        }
   },
  "prefill": {
    "name": currentUser.username
   },
   "notes":[currentUser._id,...products_names]
 };
  var paymentObject = new window.Razorpay(options);
  return(
 paymentObject.open())
}
export { DisplayRazorPayCheckout };