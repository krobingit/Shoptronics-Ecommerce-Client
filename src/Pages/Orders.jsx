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
import { small, medium } from '../responsive';

import { OrderInfo } from '../Components/orderDetail';

const LoaderContainer = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
`
const Container = styled.div`
padding:1rem;
`
const MainContainer = styled.div`
`
const Large = styled.div`
display:flex;
flex-direction:column;
align-items:center;
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
`
const Heading = styled.h2
`font-family: 'Raleway', sans-serif;
background:gold;
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
justify-content:space-around;
${medium({ alignItems:'center'})}
`

const ProductCard = styled.div`
padding:0.4rem;
display:flex;
width:100%;
justify-content:space-evenly;
${medium({ flexDirection: "column",alignItems:"center",justifyContent:"center" })}
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
const Line = styled.div`
 border: 1px dashed darkgray;
width:100%;
`;
const Status = styled.span`

`
const OrderDetail = styled.div`
font-family: 'Signika Negative', sans-serif;
font-weight:bold;
width:max-content;
font-size:1.3rem;
border-bottom:2px dotted gold;
${small({fontSize:"1.1rem"})}
`


const ProductQty = styled.h3``
const ProductPrice=styled.h3``

const OrderDate = styled.span`
color:brown;
`

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
 }, [currentUser]);

 return (
  <MainContainer>
  <Navbar />
   <Title><i className="fas fa-shopping-bag"></i>ORDERS</Title>
   {loading ?
    <LoaderContainer>
     <SpinnerCircularFixed size={70} thickness={80} speed={163} color="#141e30" secondaryColor="gold" />
    </LoaderContainer>
    :
    <Container>
     {
     order.length === 0
      ?
      <>
       <Button
        style={{ marginLeft: "3rem", marginBottom: "3rem" }}
        color="yellow"
        onClick={() => history.push("/products")}
       >
        Continue to Shop
       </Button>
       <EmptyContainer>

        <h3 style={{ fontSize: "1.5rem" }}>You haven't ordered any items yet!</h3>
        <OrderEmptyImage src={Empty}></OrderEmptyImage>
       </EmptyContainer>
      </>
      :
      <Summary>
        <Heading>Recent Orders ({order.length})</Heading>
       <Products>
         {order.map((each) =>

         <Large>
          <Heading style={{fontSize:"1.2rem",margin:"1rem 0",fontWeight:"bold"}}>OrderID: {each.paymentData.order_id}</Heading>
          <OrderDetail style={{marginBottom:"1rem"}}>Order Date: <OrderDate>{new Date(each.createdAt).toDateString()},{new Date(each.createdAt).toTimeString().substring(0, 9)}IST</OrderDate></OrderDetail>
             <OrderDetail style={{fontSize:"1.3rem",marginBottom:"1.5rem"}}>Order Status: <Status
              style={{
               color: (each.orderStatus === "Processing" && "orange") || (each.orderStatus === "Shipped" && "purple")
                || (each.orderStatus === "Delivered" && "green")
              }}>
              {each.orderStatus}</Status></OrderDetail>
           {each.products.map((product) =>

           <ProductCard key={product._id}>
            <ProductImage src={product.image} />
            <ProductName>{product.name}</ProductName>
            <ProductPrice>₹{Math.round(product.price * 76).toLocaleString()}</ProductPrice>
            <ProductQty>Qty: {product.quantity}</ProductQty>

           </ProductCard>)
           }

            <OrderInfo amount={each.paymentData.amount} last4={each.paymentData.card.last4}
             id={each.paymentData.id} contact={each.paymentData.contact} address={each.paymentData.notes.address} />

          {order.length>1 &&
           <><Line></Line></>}
         </Large>


        )}
       </Products>
      </Summary>
    }
    </Container>
   }
</MainContainer>
)
}
