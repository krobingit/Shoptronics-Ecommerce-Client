import { useState, useEffect } from 'react';
import { SpinnerCircularFixed} from 'spinners-react';
import styled from 'styled-components';
import { Navbar } from '../Components/Navbar';
import { Title } from './Home';
import { useSelector } from 'react-redux';
import { commonRequest } from '../axiosreq';
import Empty  from '../Assets/orderEmpty.png';
import { Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

const LoaderContainer = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
`
const Container = styled.div`
`
const EmptyContainer = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`
const OrderEmptyImage = styled.img`
`
const Summary = styled.div`
margin:1rem;
`
const Heading = styled.h2
`font-family: 'Raleway', sans-serif;
background:yellow;
text-transform:uppercase;
width:max-content;
border-radius:1rem;
padding:0.3rem;
`
const Products = styled.div`
background: rgba( 255, 255, 255, 0.25 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.5 );
border-radius: 10px;
border: 1px solid rgba( 255, 255, 255, 0.18 );
display:flex;
flex-direction:column;
flex-wrap:wrap;
margin-bottom:2rem;
`

const ProductCard = styled.div`
margin1.2rem;
padding:0.5rem;
display:flex;
gap:1.2rem;
align-items:center;
justify-content:space-evenly;
${medium({ flexDirection: "column", width: "22rem" })}

`

const ProductImage = styled.img`
width:13rem;
height:10rem;
object-fit:contain;
object-position:center center;
`

const ProductName = styled.h3`
width:15rem;
font-size:1.2rem;
`
const ProductQty = styled.h3``
const ProductPrice=styled.h3``


export const Orders = () => {
 let history = useHistory();
 const [order, setOrder] = useState(null);
 const [loading, setLoading] = useState(true);
 const { currentUser } = useSelector(state => state.user);
 useEffect(() => {
  const fetchData = async () => {
   try {
    const response = await commonRequest.get(`/order/${currentUser._id}`, {
     headers: { token: currentUser.token }
    })
    setOrder(response.data);
    setLoading(false)
   }
   catch (err) {
    console.log("Error Fetching Order", err);
    setLoading(false)
   }
  }
  fetchData();
 }, [currentUser._id,currentUser.token]);
 console.log(order);
 return (
  <>
  <Navbar />
   <Title><i className="fas fa-shopping-bag"></i> Orders</Title>
   {loading ?
    <LoaderContainer>
    <SpinnerCircularFixed size={70} thickness={80} speed={163} color="#141e30" secondaryColor="gold" />
   </LoaderContainer>
    :
    <Container>{
     order.length === 0
      ?<>
       <Button
        style={{ marginLeft: "3rem",marginBottom:"3rem" }}
        color="yellow"
        onClick={() => history.push("/products")}
      >
        Continue to Shop
      </Button>
      <EmptyContainer>

       <h3 style={{fontSize:"1.5rem"}}>You haven't ordered any items yet!</h3>
             <OrderEmptyImage src={Empty}></OrderEmptyImage>
       </EmptyContainer>
       </>
      :

         <Summary>
 <Heading>Order Summary</Heading>
           <Products>
  {order.products.map((product) =>
    <ProductCard key={product._id}>
        <ProductImage src={product.image} />
        <ProductName>{product.name}</ProductName>
      <ProductPrice>₹{Math.round(product.price*76).toLocaleString()}</ProductPrice>
      <ProductQty>Qty: {product.quantity}</ProductQty>
          </ProductCard>
        )}
           </Products>
           </Summary>


    }

     </Container>
   }
</>
)
}