import { useEffect, useState,forwardRef } from 'react';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import { commonRequest } from '../axiosreq';
import BeatLoader from "react-spinners/BeatLoader";
import { small } from '../responsive';
import { CartPlus, HeartFill } from 'react-bootstrap-icons';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

const Container = styled.div`
padding:0 2rem;
`
const LoaderContainer = styled.div`
display:flex;
align-items:center;
justify-content:center;
`

const ProductContainer = styled.div`
display:flex;
flex-wrap:wrap;
align-items:center;
justify-content:center;
`
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
/*&:hover{
transform:scale(1.1);}
transition:all 0.3s;*/
const ProductImage = styled.img`
width:17rem;
height:12rem;
object-fit:fill;
`
const ProductTitle = styled.h2`
font-size:1.8rem;
text-align:center;
margin:0 0 2rem 0;
text-shadow:1.5px 1px #141e30;
color:gold;
letter-spacing:3px;
background:linear-gradient(135deg, #121721 0%, #000000 100%) fixed;
font-family: 'Fira Sans', sans-serif;
${small({fontSize:"1.5rem"})}
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


export function Products() {

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

  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);

   const { wishlistproducts } = useSelector(state => state.wishlist);
  const [notify, setNotify] = useState(false);
  const getProducts = async () => {
    try {
      const res = await commonRequest.get("/product");
      setProducts(res.data);
      setLoading(false)
    }
    catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    getProducts();

  }, [])


  const detailstyle = { fontSize: "1.1rem" };
  return (
    <>
   <ProductTitle>PRODUCTS
          </ProductTitle>
   <Container>
     {
       loading ?
         <LoaderContainer>
              <BeatLoader color="#141e30" margin={7} loading={loading} size={25} />
         </LoaderContainer>
         :
         <>
              <ProductContainer>
                        { notify && <>
      <Snackbar     TransitionComponent={transition}
        key={transition ? transition.name : ''} open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
            This item is already on your wishlist!!
        </Alert>
      </Snackbar>
                </>}

           {products.map(({ name, price, category,manufacturer,image,_id })=>
             <ProductCard key={_id} >
               <ProductImage src={image} onClick={() => history.push(`/product/${_id}`)} alt="product"/>
               <ProductDetails>
                 <p style={detailstyle}> {name}</p>
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
                 }><HeartFill
                     style={{ fontSize: "1.9rem", color: "grey" }} /></IconButton>

               </ProductActions>
             </ProductCard>
           )}

         </ProductContainer>
</>


}

  </Container>
</>

)

}