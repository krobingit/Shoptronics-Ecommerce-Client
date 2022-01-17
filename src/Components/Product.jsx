import { useState } from 'react';
import {useHistory} from 'react-router-dom';
import { CartPlus} from 'react-bootstrap-icons';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Heart from "react-animated-heart";
import { small } from '../responsive';

const ProductCard = styled.div`
width:min-content;
margin:0.7rem;
overflow:hidden;
padding:.5rem 1rem;
background: rgba( 255, 255, 255, 0.25 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.5 );
border-radius: 10px;
border: 1px solid rgba( 255, 255, 255, 0.18 );
${small({margin:"0.5rem"})}
`

const ProductImage = styled.img`
width:15rem;
height:10rem;
object-fit:fill;
cursor:pointer;
${small({width:"12.5rem",height:"6rem"})}
`
const ProductDetails = styled.div`
text-align:center;
font-family: 'Fira Sans', sans-serif;
padding:0.5rem;

`
const ProductActions = styled.div`
display:flex;
justify-content:space-evenly;
align-items:center;
margin-left:2rem;
`
const Values = styled.span`
color:brown;
`
  const detailstyle = { fontSize: "1.1rem" };

export function Product({ name, price, image, _id,instock, setNotify,
 handleClick, TransitionLeft }) {
  const history = useHistory();

 const [click, setClick] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);

   const { wishlistproducts } = useSelector(state => state.wishlist);
 return (

<ProductCard key={_id} >
               <ProductImage src={image} onClick={() => history.push(`/product/${_id}`)} alt="product"/>
               <ProductDetails>
                 <p style={{fontSize:"1.1rem",cursor:"pointer"}} onClick={() => history.push(`/product/${_id}`)}> {name}</p>
                 <p style={detailstyle}>Price: <Values style={{fontSize:"1.5rem"}}>₹{Math.round(price).toLocaleString()}</Values></p>
               </ProductDetails>
               <ProductActions>
                 <IconButton style={{ color: "#141e30"}} onClick={()=>history.push(`/product/${_id}`)}>
                   <CartPlus style={{ fontSize: "1.9rem" }} /></IconButton>
       <Heart style={{ fontSize: "1rem"  }} isClick={click}
         onClick={() => {
setClick(!click)
                   if (!currentUser) {
                     history.push("/login")
                     return;
                   }
                   if (currentUser) {
                     if (click) {
                       dispatch({ type: "WishListRemoveItem", index: wishlistproducts.indexOf({ _id }) })
                       handleClick(TransitionLeft);
                       setNotify(true);
                     }
                     else {
                       if (wishlistproducts.map((product) => product.name).every((pname) => pname !== name))
                       dispatch({ type: "WishListAddItem", payload: { name, price, image, _id,instock } })
                     }


 }
                 }
                 }></Heart>

               </ProductActions>
             </ProductCard>


)



}