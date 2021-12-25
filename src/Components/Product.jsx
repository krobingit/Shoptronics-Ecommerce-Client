import { useState } from 'react';
import {useHistory} from 'react-router-dom';
import { CartPlus} from 'react-bootstrap-icons';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Heart from "react-animated-heart";
const ProductCard = styled.div`
width:min-content;
margin:1rem;
overflow:hidden;
padding:1rem;
background: rgba( 255, 255, 255, 0.25 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.5 );
border-radius: 10px;
border: 1px solid rgba( 255, 255, 255, 0.18 );
cursor:pointer;
`

const ProductImage = styled.img`
width:17rem;
height:12rem;
object-fit:fill;
`
const ProductDetails = styled.div`
text-align:center;
font-family: 'Fira Sans', sans-serif;
padding:0.5rem;
`
const ProductActions = styled.div`
display:flex;
justify-content:space-around;
margin:1rem 0 0 0;
align-items:center;
`
const Values = styled.span`
color:brown;
`
  const detailstyle = { fontSize: "1.1rem" };

export function Product({ name, price, category, manufacturer, image, _id, setNotify,
 handleClick, TransitionLeft }) {
 const history = useHistory();
 const [isClick, setClick] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);

   const { wishlistproducts } = useSelector(state => state.wishlist);
 return (

<ProductCard key={_id} >
               <ProductImage src={image} onClick={() => history.push(`/product/${_id}`)} alt="product"/>
               <ProductDetails>
                 <p style={detailstyle} onClick={() => history.push(`/product/${_id}`)}> {name}</p>
                 <p style={detailstyle}>Price: <Values style={{fontSize:"1.5rem"}}>₹{Math.round(price * 76).toLocaleString()}</Values></p>
                 <p style={detailstyle}>Category: <Values>{category[1].name}</Values></p>
                 <p style={detailstyle}>Brand: <Values>{manufacturer}</Values></p>
               </ProductDetails>
               <ProductActions>
                 <IconButton style={{ color: "#141e30" }} onClick={()=>history.push(`/product/${_id}`)}>
                   <CartPlus style={{ fontSize: "1.9rem" }} /></IconButton>
                 <IconButton  style={{ color: "#A9A9A9"}} onClick={() => {

                   if (!currentUser) {
                     history.push("/login")
                     return;
                   }
                   if (currentUser) {
                     if (wishlistproducts.map((product) => product.name).every((pname) => pname !== name)) {
                       dispatch({ type: "WishListAddItem", payload: { name, price, image, _id } })

                     }
                     else {
                       handleClick(TransitionLeft);
                       setNotify(true);
                     }
                   }
                 }
                 }><Heart  isClick={isClick} onClick={() => setClick(!isClick)}
                     style={{ fontSize: "1.9rem" }} /></IconButton>

               </ProductActions>
             </ProductCard>


)



}