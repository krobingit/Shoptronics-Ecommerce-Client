import styled from 'styled-components';
import { useParams,useHistory } from 'react-router-dom';
import { AdminNav } from '../Components/AdminNavBar';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import { commonRequest } from '../axiosreq';
import { Button } from 'semantic-ui-react';
import { Form } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { Select } from 'semantic-ui-react';

const FormContainer = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
padding:1rem;
`
const Card = styled.div`
margin:0;
`
const ProductDetail = styled.p`
margin:0;
`
export const AdminOrderEditStatus = () => {
  const { orderid, userid } = useParams();

  const { currentUser } = useSelector(state => state.user)
  const [order, setOrder] = useState(null);
  useEffect(() => {
    const getOrder = async () => {
      await commonRequest.get(`/order/${orderid}/${userid}`, {
        headers: {
          token: currentUser.token
        }
      }).then((response) => setOrder(response.data))

    }
    getOrder()
  }, [orderid, currentUser.token, userid])

  return order && <StatusChange order={order}/>;
}


const StatusChange = ({ order }) => {
      let history = useHistory();
  const [status, setStatus] = useState(order.orderStatus);
  const { orderid, userid } = useParams();
  const { currentUser } = useSelector(state => state.user);

const ToastSuccess = () => {
  return toast.success("Order Status Changed Successfully", {
    position: "bottom-right",
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    theme: "colored",
  });
 };
  const formStyles = {
   background: 'whitesmoke',
   boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37)",
   width: "90%",
   padding: "1.5rem",
   margin: "1.5rem 0",
   borderRadius: "1rem",
   fontSize: "1.1rem",
   display: "flex",
   flexDirection: "column",
   justifyContent: "center"
  }
  const handleChange = (event) => {
    setStatus(event.target.textContent)

  }
   const handleSubmit = async() => {
     await commonRequest.put(`/order/${orderid}/${userid}`,
       {
         orderStatus: status
       }, {
     headers:{token:currentUser.token}

     }).then(() => {
       ToastSuccess()
 setTimeout(() => {
  history.push("/adminOrderList")
  },2500)
     }
    )


  }
  const orderStatusOptions = [
  { key: 'Pr', value: 'Processing', text: 'Processing' },
  { key: 'Sh', value: 'Shipped', text: 'Shipped' },
  { key: 'De', value: 'Delivered', text: 'Delivered' }
  ]
  let i = 0;
 return (
  <>
   <AdminNav />
   <FormContainer>


       <Form style={formStyles} onSubmit={handleSubmit}>
         <h3 style={{ textAlign: "center", letterSpacing: "1.5px", color: "#4f2f5e" }}>ORDER STATUS</h3>
         <Form.Input label="Order ID" value={order.paymentData.order_id} readOnly></Form.Input>
         <h4>PRODUCTS</h4>
         {order.products.map((product,idx) =>
           <Card key={idx}>
             <ProductDetail>{++i}. {product.name} (Qty: {product.quantity})</ProductDetail>
             </Card>
         )}
         <h4>ORDER STATUS</h4>
         <Select onChange={handleChange} style={{ marginBottom: "1rem" }} value={status} placeholder='Select Status' options={orderStatusOptions} />
        <Button type="submit" color="green">Update Order Status</Button>
         <ToastContainer
          position="bottom-right"
          autoClose={3500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
        />
       </Form>
        <Button style={{marginRight:"auto",marginLeft:"2rem"}} onClick={() => history.push("/adminOrderList")} color="yellow">Go to Orders</Button>
      </FormContainer>
  </>
)

}