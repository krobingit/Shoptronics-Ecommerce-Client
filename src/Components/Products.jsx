import { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import { commonRequest } from '../axiosreq';
import RotateLoader from "react-spinners/RotateLoader";
import { small } from '../responsive';
import { CartPlus, HeartFill } from 'react-bootstrap-icons';
import { IconButton } from '@mui/material';

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
background:black;
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

  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

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
           <RotateLoader color="yellow" loading={loading} size={23} />
         </LoaderContainer>
         :
         <>
         <ProductContainer>
           {products.map(({ name, price, category,manufacturer,image,_id })=>
             <ProductCard key={_id} onClick={()=>history.push(`/product/${_id}`)}>
               <ProductImage src={image} alt="product"/>
               <ProductDetails>
                 <p style={detailstyle}> {name}</p>
                 <p style={detailstyle}>Price: <Values style={{fontSize:"1.5rem"}}>₹{Math.round(price * 76)}</Values></p>
                 <p style={detailstyle}>Category: <Values>{category[1].name}</Values></p>
                 <p style={detailstyle}>Brand: <Values>{manufacturer}</Values></p>
               </ProductDetails>
               <ProductActions>
                 <IconButton style={{ color: "#141e30" }} onClick={()=>history.push(`/product/${_id}`)}>
                   <CartPlus style={{ fontSize: "1.9rem" }} /></IconButton>
                 <IconButton style={{color:"#A9A9A9"}}><HeartFill style={{fontSize:"1.9rem"}}/></IconButton>
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