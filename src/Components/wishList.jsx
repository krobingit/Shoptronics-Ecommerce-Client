import { IconButton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { medium, small,large } from '../responsive';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { useState,forwardRef } from "react";
import { useHistory } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useConfirm } from "material-ui-confirm";

const Container = styled.div`
padding:2rem;
`
const WishListContainer = styled.div`

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
const WishListImage = styled.img`
width:14rem;
height:10rem;
${small({width:"12rem"})}
`
const DetailContainer = styled.div`
display:flex;
gap:4rem;

${small({ flexDirection: "column", gap: "1.2rem" })}
${medium({flexDirection:"column",gap:"1.2rem"})}
`
const NameContainer = styled.div`
display:flex;
flex-direction:column;
width:11rem;
margin-right:0.6rem;
${small({ flexDirection: "column", alignItems: "center", width: "100%" })}
${medium({flexDirection:"column",alignItems:"center",justifyContent: "space-around",width:"100%"})}
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
${small({ flexDirection: "row", alignItems: "center", justifyContent: "space-around", width: "100%" })}
${medium({flexDirection:"row",alignItems:"center",justifyContent: "space-around",width:"100%"})}
`
const ProductPrice = styled.h4`
font-size:1.3rem;
margin:0;
color:black;
`
const StockContainer = styled.div`
display:flex;
gap:1rem;
align-items:center;
flex-direction:column;
width:7rem;
${small({ flexDirection: "row", alignItems: "center", justifyContent: "space-around", width: "100%" })}
${medium({flexDirection:"row",alignItems:"center",justifyContent: "space-around",width:"100%"})}
`

const ProductStock = styled.h4`
font-size:1.2rem;
padding: 0.4rem;
margin:0;
text-align:center;
color:black;
`

const Remove = styled.div`
`
const CartContainer = styled.div`
display:flex;
justify-content:center;
`

export const WishListComp = () => {
    const confirm = useConfirm();
 const { wishlistproducts } = useSelector((state) => state.wishlist);
 const history = useHistory();
  const dispatch = useDispatch();
  const [notify, setNotify] = useState(false);
  //For SNACKBAR ALERT
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
   {wishlistproducts.map((product) =>
    <WishListContainer key={product._id}>
     <WishListImage src={product.image} />
     <DetailContainer>
      <NameContainer>
       <ProductName>{product.name}</ProductName>
      </NameContainer>

      <PriceContainer>
       <ProductPrice>Price</ProductPrice>
       <ProductPrice>₹{Math.round(product.price).toLocaleString()}</ProductPrice>
      </PriceContainer>

       <StockContainer>
            <ProductStock>Stock Status</ProductStock>
        {product.instock ? <ProductStock style={{ color: "green"}}>IN STOCK</ProductStock> :
<ProductStock style={{  color: "red" }}>OUT OF STOCK</ProductStock> }
        </StockContainer>

      <CartContainer>
       <Button color="yellow" style={{height:"min-content"}} onClick={()=>history.push(`/product/${product._id}`)}>Add To Cart</Button>
       </CartContainer>
       </DetailContainer>
       { notify && <>
      <Snackbar     TransitionComponent={transition}
        key={transition ? transition.name : ''} open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
           Item removed from your Wishlist!
        </Alert>
      </Snackbar>
    </>}
     <Remove>
         <IconButton  onClick={async () => {
await confirm({ description: `Do you want to remove this item from wishlist?` })
  .then(() => {
           dispatch({ type: "WishListRemoveItem", index: wishlistproducts.indexOf(product), payload: product })
          setNotify(true)
    handleClick(TransitionLeft)
      })
      .catch((err) => err && console.log(err))
         }}>
           <DeleteIcon style={{fontSize:"2.3rem",color:"orangered"}}/> </IconButton>
     </Remove>


    </WishListContainer>
   )}
     </Container>
)



}