
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

async function DisplayRazorPayCheckout(total,username) {
console.log(total)

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
  "description": `More Power to you!!`,
  "image": logo,
  "order_id": res.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
  "handler": function (response) {
   alert(response.razorpay_payment_id);
   alert(response.razorpay_order_id);
   alert(response.razorpay_signature)
  },
  "prefill": {
   "name": username
  }
 };
  var paymentObject = new window.Razorpay(options);

 paymentObject.on('payment.failed', function (response){
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
 });
  return(
 paymentObject.open())
}
export { DisplayRazorPayCheckout };