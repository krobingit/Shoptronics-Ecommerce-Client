
import logo from '../Assets/logo.jpg';
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

 const res = await loadRazorPay("https://checkout.razorpay.com/v1/checkout.js");
 if (!res) {
  alert("Razorpay failed")
return
 }

 const data = await fetch("http://shoptronics-ecommerce.herokuapp.com/razorpay", {
   method: "POST",
   body:JSON.stringify({amount:total})
 }).then(data => data.json())

  console.log(data)

 var options = {
  key: 'rzp_test_2I9iqbhqh8BDIH', // Enter the Key ID generated from the Dashboard
  "amount": data.response.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  "currency": data.response.currency,
  "name": "Shoptronics Order",
  "description": "Pay",
  "image": logo,
  "order_id": data.response.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
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
 paymentObject.open();
 paymentObject.on('payment.failed', function (response){
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
});
}
export { DisplayRazorPayCheckout };