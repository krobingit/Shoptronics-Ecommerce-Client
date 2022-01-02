import { useState, useEffect,forwardRef } from "react";
import { useParams } from "react-router-dom";
import { commonRequest } from "../axiosreq";
import { Navbar } from "../Components/Navbar";
import styled from "styled-components";
import { medium, small } from "../responsive";
import SkewLoader from "react-spinners/SkewLoader";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { IconButton } from "@mui/material";
import { useDispatch,useSelector } from "react-redux";
import InfoIcon from '@mui/icons-material/Info';
import { Button } from "semantic-ui-react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { useHistory } from 'react-router-dom';
import { HeartFill } from 'react-bootstrap-icons';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Title } from "./Home";



const MainContainer = styled.div`
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: center;
align-items:center;
  margin: 2rem 6rem;
  gap: 2rem;
padding:0rem 2.5rem;
${medium({ flexWrap: "wrap", margin: "auto" })}
${small({margin:"auto"})}
`
const ProductImage = styled.img`
  object-fit: contain;
  width: 28rem;
  height: 25rem;
${small({width:"24rem"})}
`
const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const DetailContainer = styled.div`
  display: flex;
  padding: 2rem;
  justify-content: flex-start;
  flex-direction: column;
`

const ProductName = styled.h1`
font-size:1.8rem;
${small({fontSize:"1.6rem"})}
`
const StockButton = styled(Button)`
width:10rem;
height:2.5rem;
`
const ProductBrand = styled.p`
  font-size: 1.3rem;
font-weight:600;
font-family: 'Raleway', sans-serif;`;
const ProductModel = styled.p`
  font-size: 1.3rem;
font-weight:600;
font-family: 'Raleway', sans-serif;`;

const ProductPrice = styled.h3`
  color: #bf9000;
  font-size: 2.2rem;
`;
const ProductDesc = styled.p`
  font-size: 1.3rem;
font-weight:600;
font-family: 'Raleway', sans-serif;
`;
const ProductActions = styled.div`
margin-top:2rem;
display:flex;
justify-content:space-around;
gap:1rem;
`
const QuantityContainer = styled.div`
border:2px solid #141e30;
border-radius:0.5rem;
width:6rem;
height:3.3rem;
display:flex;
gap:1rem;
align-items:center;
justify-content:space-around;
padding:1.3rem 0;
`
const AddRemoveButtons = styled.div`

`;
const CartContainer = styled.div`
display:flex;
flex-direction:column;
gap:1rem;
`
const Value = styled.span`
color: #bf9000 ;
`
const PriceBlock = styled.div`
margin-bottom:1rem;
`
const ShippingPrice = styled.p`
font-size:1.2rem;
`
const Line = styled.p`
margin-top:1rem;
border:0.6px solid darkgray;
`
const Options = styled.div`
display:flex;
`
const StockMessage = styled.p`
color:red;
font-size:1rem;
margin:1rem
`
const toastwish = () => {
return(toast.warn('Item already on Wishlist!', {
position: "top-right",
autoClose: 3000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
  progress: undefined,
  theme: "colored"
}));
}
export const ProductToCart = () => {
 let history = useHistory();

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

  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [notify, setNotify] = useState(false);
  const { currentUser } = useSelector(state => state.user);

   const { wishlistproducts } = useSelector(state => state.wishlist);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  //const {products}=useSelector(state=>state.cart)
  //adding and removing items
  const handleQuantity = (type) => {
    if (type === "add")
      setQuantity(quantity + 1);
    else
      if (quantity > 1)
        setQuantity(quantity - 1)

  }

  const handleCart = () => {
    let cart = { ...product, quantity }
    dispatch({ type: "AddItem", payload: cart })
    setNotify(true)
    handleClick(TransitionLeft);
  }

//get product by id
  const getProduct = async (id) => {
    try {
      const response = await commonRequest.get(`/product/${id}`);
      setProduct(response.data);
      setLoading(false);
    } catch (err) {
      console.log("Error Fetching Product:" + err);
      setLoading(false);
    }
  };
  useEffect(() => {
    getProduct(id);
  }, [id]);

  const btnstyle={ width: "15rem", fontSize: "1.2rem", fontWeight: "700", height: "3.4rem", borderRadius: "1rem", color: "#141e30" }
  return (


    <MainContainer>
      <Navbar />
      <Title>Product Description</Title>

      {loading ? (
        <LoaderContainer>
          <SkewLoader color="yellow" loading={loading} size={25} />
        </LoaderContainer>
      ) : (
        <ItemContainer>
          <ProductImage src={product.image}></ProductImage>
            <DetailContainer>
              {product.instock ?
                <StockButton color='green'>In Stock</StockButton>
                : <StockButton color='red'>Out Of Stock</StockButton>}
               {!product.instock && <StockMessage><i className="fas fa-exclamation-triangle"></i> Product is Out Of Stock!
                  Add to WishList and you will get notified when it is in stock</StockMessage>}
              <ProductName>{product.name}</ProductName>
              <PriceBlock>
                <ProductPrice>₹{Math.round(product.price).toLocaleString()}</ProductPrice>
                 <ShippingPrice>{product.shipping>1 ? `Shipping: ₹${Math.round(product.shipping+100)}` : ''}</ShippingPrice>
                </PriceBlock>
              <ProductDesc><InfoIcon style={{ color: "#141e30", marginRight:"5px"}}/>
              {product.description.split(";").join(",")}
            </ProductDesc>
            <ProductBrand>Brand: <Value>{product.brand}</Value></ProductBrand>
 <ProductModel>Model: <Value>{product.model}</Value></ProductModel>
              <ProductActions>
                <QuantityContainer>
                  <h1 style={{ padding: "0.4rem",color:"#141e30" }}>{quantity}</h1>
                  <AddRemoveButtons>
                    {/*Add Item button */ }
                    <IconButton disabled={!product.instock} onClick={()=>handleQuantity("add")} style={{fontSize:"1.2rem",padding:"0",display:"block",color:"gold"}}>
                  <ArrowDropUpIcon />
                    </IconButton>
                    {/*Remove Item button */ }
                <IconButton disabled={!product.instock} onClick={()=>handleQuantity("remove")} style={{fontSize:"1.2rem",padding:"0",display:"block",color:"gold"}}>
                  <ArrowDropDownIcon />
                </IconButton>
                </AddRemoveButtons>
                </QuantityContainer>
                <CartContainer>
                    <Button inverted color='yellow' style={btnstyle} disabled={!product.instock }
                    onClick={() => handleCart()}><i className="fas fa-shopping-cart"></i> Add To Cart</Button>

                </CartContainer>
              </ProductActions>
              <Line></Line>
              <p style={{ fontSize: "1.1rem" }}>Category: <Value>{product.category}</Value></p>
                      <Options>
              <Button color="yellow" style={{ margin: "0 0 0 1.5rem",height:"3.5rem",padding:"0 1rem",fontSize:"1.1rem", width: "min-content" }} onClick={() => history.goBack()}>Previous</Button>
                <Button  style={{ margin: "0 0 0 1.5rem",height:"3.5rem",padding:"0 1rem",fontSize:"1.1rem" }} onClick={() => {

                   if (!currentUser) {
                     history.push("/login")
                     return;
                   }
                   if (currentUser) {
                     if (wishlistproducts.map((product) => product.name).every((pname) => pname !== product.name)) {
                       dispatch({ type: "WishListAddItem", payload: { name:product.name, price:product.price, image:product.image, _id:product._id,instock:product.instock } })

                     }
                     else {
                       return toastwish();
                     }
                   }
                 }
                 } color="yellow"><HeartFill
                    style={{color: "red" }} /> Add to Wishlist</Button>
                </Options>
            </DetailContainer>
        </ItemContainer>
      )}
         { notify && <>
      <Snackbar     TransitionComponent={transition}
        key={transition ? transition.name : ''} open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Wohoo🎉 {product.name} has been added to your Cart!
        </Alert>
      </Snackbar>
      </>}
      <ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
      </MainContainer>
  );
};
