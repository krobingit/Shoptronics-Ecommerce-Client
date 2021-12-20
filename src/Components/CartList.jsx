import { IconButton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { medium, small } from '../responsive';



const Container = styled.div`
`
const CartListContainer = styled.div`
padding:1rem;
margin-bottom:1.5rem;
display:flex;
gap:1rem;
background: rgba( 255, 255, 255, 0.55 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
border-radius: 10px;
border: 1px solid rgba( 255, 255, 255, 0.18 );
${small({ flexDirection: "column",width:"100%", alignItems: "center" })}
${medium({flexDirection:"column",width:"100%",alignItems:"center"})}
`
const CartImage = styled.img`
width:10rem;
height:10rem;
`
const DetailContainer = styled.div`
display:flex;
gap:0.8rem;
margin-left:1rem;
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
font-size:1.3rem;
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

`
const QuantityContainer = styled.div`
display:flex;
gap:1rem;
flex-direction:column;
width:7rem;
${small({ flexDirection: "row", alignItems: "center", justifyContent: "space-around", width: "100%" })}
${medium({flexDirection:"row",alignItems:"center",justifyContent: "space-around",width:"100%"})}
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
width:8rem;
${small({ flexDirection: "row", alignItems: "center", justifyContent: "space-around", width: "100%" })}
${medium({flexDirection:"row",alignItems:"center", justifyContent: "space-around",width:"100%"})}
`
const ProductSubTotal = styled.h4`
font-size:1.3rem;
margin:0;
color:brown;
`
const Remove = styled.div`

`

export const CartList = () => {
 const { products, total, quantity } = useSelector((state) => state.cart);

 console.log({ products, total, quantity });
 const dispatch = useDispatch();
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
       <ProductPrice>₹{Math.round(product.price * 76)}</ProductPrice>
      </PriceContainer>

       <QuantityContainer>
            <ProductQuantity>Quantity</ProductQuantity>
       <ProductQuantity style={{ padding: "0.4rem",color:"#141e30" }}>{product.quantity}</ProductQuantity>
        </QuantityContainer>

        <SubTotalContainer>
       <ProductSubTotal>Sub Total</ProductSubTotal>
       <ProductSubTotal>₹{Math.round(product.price * 76)*product.quantity}</ProductSubTotal>
       </SubTotalContainer>
     </DetailContainer>
     <Remove>
      <IconButton  style={{color:"grey"}} onClick={() => dispatch({ type: "RemoveItem", index: products.indexOf(product), payload:product })}>
       <i className="far fa-times-circle"></i></IconButton>
     </Remove>


    </CartListContainer>
   )}
     </Container>
)



}