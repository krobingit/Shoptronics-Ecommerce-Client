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
import { useDispatch } from "react-redux";
import InfoIcon from '@mui/icons-material/Info';
import { Button } from "semantic-ui-react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { useHistory } from 'react-router-dom';


const Title = styled.h2`
  font-size: 1.8rem;
  text-align: center;
  margin: 0 0 2rem 0;
  text-shadow: 1.5px 1px #141e30;
  color: gold;
  letter-spacing: 3px;
  background: #141e30;
  font-family: "Fira Sans", sans-serif;
padding:0.5rem;
  ${small({ fontSize: "1.5rem" })}
`;
const MainContainer = styled.div`

`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: center;
align-items:center;
  margin: 2rem 6rem;
  gap: 2rem;
padding:0rem 1.5rem;
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
width:7rem;
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
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

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
              <StockButton color='yellow'>In Stock</StockButton>
              <ProductName>{product.name}</ProductName>
              <PriceBlock>
                <ProductPrice>₹{Math.round(product.price * 76)}</ProductPrice>
                 <ShippingPrice>{product.shipping>1 ? `Shipping: ₹${Math.round(product.shipping+100)}` : ''}</ShippingPrice>
                </PriceBlock>
              <ProductDesc><InfoIcon style={{ color: "#141e30", marginRight:"5px"}}/>
              {product.description.split(";").join(",")}
            </ProductDesc>
            <ProductBrand>Brand: <Value>{product.manufacturer}</Value></ProductBrand>
 <ProductModel>Model: <Value>{product.model}</Value></ProductModel>
              <ProductActions>
                <QuantityContainer>
                  <h1 style={{ padding: "0.4rem",color:"#141e30" }}>{quantity}</h1>
                  <AddRemoveButtons>
                    {/*Add Item button */ }
                    <IconButton onClick={()=>handleQuantity("add")} style={{fontSize:"1.2rem",padding:"0",display:"block",color:"gold"}}>
                  <ArrowDropUpIcon />
                    </IconButton>
                    {/*Remove Item button */ }
                <IconButton onClick={()=>handleQuantity("remove")} style={{fontSize:"1.2rem",padding:"0",display:"block",color:"gold"}}>
                  <ArrowDropDownIcon />
                </IconButton>
                </AddRemoveButtons>
                </QuantityContainer>
                <CartContainer>
                    <Button inverted color='yellow' style={btnstyle}
                    onClick={() => handleCart()}><i className="fas fa-shopping-cart"></i> Add To Cart</Button>
                </CartContainer>
              </ProductActions>
              <Line></Line>
              <p style={{ fontSize: "1.1rem" }}>Categories: <Value>{product.category[0].name},{product.category[1].name}</Value></p>
             <Button color="yellow" style={{margin:"0 0 0 1.5rem",width:"min-content"}} onClick={()=>history.goBack()}>Previous</Button>
            </DetailContainer>
        </ItemContainer>
      )}
         { notify && <>
      <Snackbar     TransitionComponent={transition}
        key={transition ? transition.name : ''} open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Yayy!! {product.name} has been added to your Cart!
        </Alert>
      </Snackbar>
    </>}
      </MainContainer>
  );
};
