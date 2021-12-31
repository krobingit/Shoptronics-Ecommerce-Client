import { AdminNav } from '../Components/AdminNavBar';
import { useState, useEffect } from 'react';
import { commonRequest } from '../axiosreq';
import { DataGrid } from '@mui/x-data-grid';
import styled from 'styled-components';
import { Title } from '../Pages/Home';
import { IconButton } from '@mui/material';
import DotLoader from "react-spinners/DotLoader";
import { useSelector } from 'react-redux';
import { useConfirm } from "material-ui-confirm";
import {  useHistory } from 'react-router-dom';
/*
background-color: #7f5a83;
background-image: linear-gradient(315deg, #7f5a83 0%, #0d324d 74%);*/
const Container = styled.div`
min-height:100vh;
padding:1.5rem;
display:flex;
align-items:center;
justify-content:center;
`
const GridContainer = styled.div`
width:100%;
height:35rem;
background: rgba( 255, 255, 255, 0 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
border-radius: 10px;
border: 1px solid rgba( 255, 255, 255, 0.18 );
`

const ButtonContainer = styled.div`
display:flex;
gap:1rem;
`
const LoaderContainer = styled.div`
display:flex;
min-height:100vh;
align-items:center;
justify-content:center;
`

export const AdminOrderList = () => {

  const history = useHistory();
 const { currentUser } = useSelector(state => state.user);
  const [orders, setOrders] = useState(null);
 const confirm = useConfirm();
  const [loading, setLoading] = useState(true);

 const getOrders = async () => {

  await commonRequest.get("/order",
    {
      headers: { token: currentUser.token }

    }).then((res) => {
     setOrders(res.data)
        setLoading(false);
    })

 }

 useEffect(() => {
  const getOrders = async () => {

  await commonRequest.get("/order",
    {
      headers: { token: currentUser.token }

    }).then((res) => {
     setOrders(res.data)
        setLoading(false);
    })

 }
    getOrders();
  },[currentUser.token])

const deleteOrder = async(id,userId) => {

  const response = await commonRequest.delete(`/order/${id}/${userId}`,
    {
      headers: { token: currentUser.token }

    })
  console.log(response);
 getOrders();

}
  const columns = [
   {
    field: '_id', headerName: 'Order ID', width: 185,
    renderCell: ({row}) => {
      return (
        <>
          <p>{row.paymentData.order_id}</p>
        </>
)

    }


   },
  {
    field: 'userEmail',
    headerName: 'USER',
    width: 200,

  },
  {
    field: 'createdAt',
    headerName: 'Order Date',
    width: 150,
    type:'number',
    renderCell: ({row}) => {
      return (
        <>
          <p>{new Date(row.createdAt).toLocaleDateString()}</p>
        </>
)

    }

  },
  {
    field: 'Amount',
   headerName: 'Total Amount ₹',
    type:'number',
    width: 160,
   renderCell: ({ row }) => {
        return (
          <>
            <p>₹{(row.paymentData.amount/100).toLocaleString()}</p>
          </>

)

      }
  },
  {
    field: 'Payment Method',
    headerName: 'Payment Method',
    width: 150,
renderCell: ({ row }) => {
        return (
          <>
            <p style={{textTransform:"uppercase"}}>{row.paymentData.method}</p>
          </>

)

      }
   },
    {
    field: 'orderStatus',
    headerName: 'Order Status',
     width: 160,
    renderCell: ({ row }) => {
        return (
          <>
            <p style={{fontWeight:"700",
               color: (row.orderStatus === "Processing" && "orange") || (row.orderStatus === "Shipped" && "purple")
                || (row.orderStatus === "Delivered" && "green")
              }}>{row.orderStatus}</p>
          </>

)

      }

  },
   {
    field: 'action',
    headerName: 'Actions',
    width: 150,
  renderCell: ({ row })=> {

        return (
         <ButtonContainer><IconButton onClick={() => history.push(`/adminOrderEditStatus/${row._id}/${row.userId}`)}>
          <i className="fas fa-edit" style={{ color: "goldenrod" }}></i></IconButton>
            <IconButton  onClick={async () => {
              await confirm({ description: `Do you want to delete this order` })
                .then(() => deleteOrder(row._id,row.userId));
            }}><i className="fas fa-trash-alt" style={{ color: "red" }}
             ></i></IconButton>
</ButtonContainer>
)


}
  },


];

 function OrderList() {
   return (

 <GridContainer>
      <DataGrid
        style={{color:"black",fontSize:"1.1rem",borderColor:"gold"}}
        rows={orders}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        getRowId={row=>row._id}
        checkboxSelection
        disableSelectionOnClick
      />
 </GridContainer>

  );
}


  return (
   <>
      <AdminNav />
      <Title>Orders</Title>
      {
        loading
          ?
          <LoaderContainer>
            <DotLoader loading={loading} color="#FFEC03" size={60} />
            </LoaderContainer>
          :
          <>

      <Container>
            <OrderList />
            </Container>
            </>
      }
      </>

)



}


