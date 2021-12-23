import { IconButton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { medium,large } from '../responsive';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { useState, forwardRef } from "react";
import DeleteIcon from '@mui/icons-material/Delete';


const Container = styled.div`
`
const CartListContainer = styled.div`
padding:1rem;
margin-bottom:1.5rem;
display:flex;
gap:1rem;
justify-content:space-evenly;
background: rgba( 255, 255, 255, 0.55 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
border-radius: 10px;
border: 1px solid rgba( 255, 255, 255, 0.18 );
${large({ flexDirection: "column", width: "100%", alignItems: "center" })}
`
const CartImage = styled.img`
width:12rem;
height:10rem;
`
const DetailContainer = styled.div`
display:flex;
gap:4rem;
${medium({flexDirection:"column",gap:"1.2rem",alignItems:"center"})}
`
const NameContainer = styled.div`
display:flex;
flex-direction:column;
width:13rem;
margin-right:0.6rem;
${medium({flexDirection:"column",justifyContent: "space-around",width:"100%"})}
`
const ProductName = styled.h4`
margin:0;
color:black;
font-size:1.2rem;
text-align:center;
`
const PriceContainer = styled.div`
display:flex;
gap:1rem;
flex-direction:column;
width:7rem;
${medium({ flexDirection: "column", justifyContent: "center", alignItems:"center",width:"100%"})}
`
const ProductPrice = styled.h4`
font-size:1.3rem;
margin:0;
`
const QuantityContainer = styled.div`
display:flex;
gap:1rem;
flex-direction:column;
width:7rem;
${medium({flexDirection:"row",justifyContent: "space-around",width:"100%"})}
`

const ProductQuantity = styled.h4`
font-size:1.3rem;
margin:0;
color:#141e30;
`
const SubTotalContainer = styled.div`
display:flex;
gap:1rem;
flex-direction:column;
width:7rem;
${medium({flexDirection:"row", justifyContent: "space-around",width:"100%"})}
`
const ProductSubTotal = styled.h4`
font-size:1.3rem;
margin:0;
color:black;

`
const Remove = styled.div`

`

export const CartList = () => {
 const { products, total, quantity } = useSelector((state) => state.cart);

  console.log({ products, total, quantity });
  const dispatch = useDispatch();
  //For SNACKBAR ALERT
   const [notify, setNotify] = useState(false);
   const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [open, setOpen] = useState(false);
  const [transition, setTransition] = useState(undefined);

  const handleClick = (Transition) => {
  setTransition(() => Transition);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}
 return (
  <Container>
   {products.map((product,idx) =>
    <CartListContainer key={idx}>
     <CartImage src={product.image} />
     <DetailContainer>
      <NameContainer>
       <ProductName>{product.name}</ProductName>
      </NameContainer>

      <PriceContainer>
       <ProductPrice>Price</ProductPrice>
           <ProductPrice>₹{Math.round(product.price * 76).toLocaleString()}</ProductPrice>
           <ProductPrice style={{ textDecoration: "line-through grey solid" }}>
             ₹{((Math.round(product.price * 76) + 10000)).toLocaleString()}</ProductPrice>
      </PriceContainer>

       <QuantityContainer>
            <ProductQuantity>Quantity</ProductQuantity>
       <ProductQuantity style={{ padding: "0.4rem",color:"#141e30" }}>{product.quantity}</ProductQuantity>
        </QuantityContainer>

        <SubTotalContainer>
       <ProductSubTotal>Total Price</ProductSubTotal>
       <ProductSubTotal style={{textShadow:"2px 1px yellow"}}>₹{(Math.round(product.price * 76)*product.quantity).toLocaleString()}</ProductSubTotal>
       </SubTotalContainer>
       </DetailContainer>
       { notify && <>
      <Snackbar     TransitionComponent={transition}
        key={transition ? transition.name : ''} open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
           One Item was removed from your Cart!
        </Alert>
      </Snackbar>
    </>}
     <Remove>
         <IconButton style={{ color: "#2d2d2d" }} onClick={() => {
           dispatch({ type: "RemoveItem", index: products.indexOf(product), payload: product })
          setNotify(true)
    handleClick(TransitionLeft);
         }}>
             <DeleteIcon style={{fontSize:"2rem",color:"crimson"}}/></IconButton>
     </Remove>


    </CartListContainer>
   )}
     </Container>
)



}