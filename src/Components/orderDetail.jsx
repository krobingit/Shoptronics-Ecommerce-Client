import styled from 'styled-components';
import { small, medium } from '../responsive';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useState} from 'react';
import { Button } from '@mui/material';


const Details = styled.div`
display:flex;
flex-wrap:wrap;
margin-bottom:3rem;
align-items:center;
gap:2rem;
justify-content:space-around;
margin:1rem 0;
${medium({ justifyContent:"center"})};
${small({flexDirection:"column",gap:"1rem"})};
`
const OrderDetail = styled.div`
font-family: 'Signika Negative', sans-serif;
font-weight:bold;
width:max-content;
font-size:1.3rem;
border-bottom:2px dotted gold;
${small({fontSize:"1.2rem"})}
`
const Address = styled.div`
font-family: 'Signika Negative', sans-serif;
font-weight:bold;
width:max-content;
font-size:1.2rem;
border-bottom:2px dotted gold;
${medium({ width:"17rem" })}
text-align:center;
border:none;
`
const OrderAmount = styled.span`
color:green;
font-size:1.4rem;
`
export function OrderInfo({amount,id,contact,method,address}) {
 const [show, setShow] = useState(false);
 return (
  <>
       <Button variant="text" style={{ margin: "1rem",color:"gold",background:"#141e30",height:"2rem", fontSize: "1.1rem", fontWeight: "bold" }} onClick={() => setShow(!show)}>{!show ? "View More" : "View Less"} {!show ? <KeyboardArrowDownIcon style={{color:"yellow"}}/>   : <ArrowDropUpIcon style={{color:"yellow"}}/> }</Button>
   {show &&
    <Details>

     <OrderDetail>Order Total: <OrderAmount>₹{(amount / 100).toLocaleString()}</OrderAmount></OrderDetail>
                 <OrderDetail>💳 Paid Online via <span style={{textTransform:"uppercase"}}>{method}</span></OrderDetail>
     <OrderDetail>#️⃣ Payment ID: {id}</OrderDetail>
             <OrderDetail>✆ Delivered to: {contact}</OrderDetail>
             <Address >Shipping Address: {address}</Address>

    </Details>
   }
   </>
)

}