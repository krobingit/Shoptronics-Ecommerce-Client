import styled from 'styled-components';
import { small, medium } from '../responsive';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useState} from 'react';
import { Button } from 'semantic-ui-react';

const Details = styled.div`
display:flex;
flex-wrap:wrap;
margin-bottom:3rem;
align-items:center;
gap:2rem;
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
${small({fontSize:"1.1rem"})}
`
const OrderAmount = styled.span`
color:green;
font-size:1.4rem;
`
export function OrderInfo({amount,last4,id,contact}) {
 const [show, setShow] = useState(false);
 return (
  <>
<Button style={{ margin: "1rem" }} size="mini" inverted color="yellow" onClick={() => setShow(!show)}>{!show ? <KeyboardArrowDownIcon/>  : <ArrowDropUpIcon/>}</Button>
   {show &&
    <Details>

     <OrderDetail>Order Total: <OrderAmount>₹{(amount / 100).toLocaleString()}</OrderAmount></OrderDetail>
     <OrderDetail>💳 Paid via Card ending {last4}</OrderDetail>
     <OrderDetail>#️⃣ Payment ID: {id}</OrderDetail>
     <OrderDetail>✆ Delivered to: {contact}</OrderDetail>

    </Details>
   }
   </>
)

}