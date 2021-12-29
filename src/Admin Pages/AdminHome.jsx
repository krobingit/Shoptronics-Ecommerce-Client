import { AdminNav } from '../Components/AdminNavBar';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { commonRequest } from '../axiosreq';
import BarLoader from "react-spinners/BarLoader";
import { Title } from '../Pages/Home';

const LoaderContainer = styled.div`
display:flex;
min-height:100vh;
align-items:center;
justify-content:center;
`
const HomeContainer = styled.div`
display:flex;
min-height:100vh;
flex-wrap:wrap;
justify-content:center;
margin:2rem;
`

const Container = styled.div`
height:40rem;
margin:1rem;
width:max-content;
overflow:hidden;
padding:1rem;
background: rgba( 255, 255, 255, 0.25 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.5 );
border-radius: 10px;
border: 1px solid rgba( 255, 255, 255, 0.18 );
overflow:scroll;
font-family: 'Merriweather', serif;
`

const Card = styled.div`
margin:0.8rem;
`
const Line = styled.div`
 border: 1px dashed darkgray;
width:100%;
`;

export const AdminHome = () => {
  const { currentUser } = useSelector(state => state.user);
  const [users, setUsers] = useState(null);
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
     const getDetails = async() => {
       await commonRequest.get(`/user?recent=true`, {
         headers: { token: currentUser.token }
       }).then((response) => {
         setUsers(response.data)
       });
       await commonRequest.get(`/order?recent=true`, {
        headers: { token: currentUser.token }
      }).then((response) => {
        setOrders(response.data)
        setLoading(false)
    })

    }
      getDetails();


    const getOrders = async () => {

    }
      getOrders();


  }, [currentUser.token])
  console.log(users,orders)
 return (
  <>
     <AdminNav />
     <Title>Admin Home</Title>
     {loading ?
       <LoaderContainer>
<BarLoader color="goldenrod" loading={loading} height="5px" size={150} />
       </LoaderContainer>
       :
<HomeContainer>
       <Container>
           <h3 style={{color:"#141e30"}}>Recently Registered Users </h3>
           {users.map((user) =>

             <Card>
               <p>{user.username}</p>
               <p>{user.email}</p>
               <p>Created At: {new Date(user.createdAt).toDateString()},{new Date(user.createdAt).toTimeString().substring(0, 9)}IST</p>

               <Line></Line>
             </Card>


)}
         </Container>
           <Container style={{width:"30rem"}}>
           <h3 style={{color:"#141e30"}}>Recent Orders</h3>
           {orders.map((each) =>
               <Card>
               <p>OrderID: {each.paymentData.order_id}</p>
               <p>Products:</p>
               <p>{each.products.map((prod) => <><p>{prod.name}</p>
               <p>Qty: {prod.quantity}</p></>)}</p>
               <p>Order Date: {new Date(each.createdAt).toDateString()},{new Date(each.createdAt).toTimeString().substring(0, 9)}IST</p>
               <p>Placed by: {each.userEmail}</p>
                          <p>Order Status: {each.orderStatus}</p>
                 <Line></Line>
               </Card>

             )

}
         </Container>
         </HomeContainer>
     }
</>
)


}