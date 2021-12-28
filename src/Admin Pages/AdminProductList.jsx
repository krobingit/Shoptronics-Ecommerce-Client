import { AdminNav } from '../Components/AdminNavBar';
import { useState, useEffect } from 'react';
import { commonRequest } from '../axiosreq';
import { DataGrid } from '@mui/x-data-grid';
import styled from 'styled-components';
import { Title } from '../Pages/Home';
import { Button } from 'semantic-ui-react';
import { IconButton } from '@mui/material';
import HashLoader from "react-spinners/HashLoader";
import { useSelector } from 'react-redux';
import { useConfirm } from "material-ui-confirm";
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
const ProductImage = styled.img`
width:3rem;
height:3.5rem;
object-fit:contain;
`
const NewProduct = styled.div`
display:flex;
align-items:flex-end;
justify-content:flex-end;
margin-right:1rem;

`
const ButtonContainer = styled.div`
display:flex;
gap:1rem;
`
const LoaderContainer = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
`

export const AdminProductList = () => {

  const {currentUser}=useSelector(state=>state.user)
  const [products, setProducts] = useState(null);
  const confirm = useConfirm();
   const getProducts = async () => {
      setLoading(true);
      const response = await commonRequest.get("/product");
      setProducts(response.data);
      setLoading(false);
    }
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getProducts();
  },[])

const deleteProduct = async(id) => {

  const response = await commonRequest.delete(`/product/${id}`,
    {
      headers: { token: currentUser.token }

    })
  console.log(response);
  getProducts();

}
  const columns = [
  { field: '_id', headerName: 'ID', width: 230 },
  {
    field: 'name',
    headerName: 'Product Name',
    width: 320,
    renderCell: ({ row }) => {

      return (
        <>
          <ProductImage src={row.image} alt="product"/>
          {row.name}
        </>

)

    }
  },
  {
    field: 'price',
    headerName: 'Price (in ₹)',
    width: 125,
    type:'number',
    renderCell: ({row}) => {
      return (
        <>
          <p>₹{Math.round(row.price*76).toLocaleString()}</p>
        </>
)

    }

  },
  {
    field: 'brand',
    headerName: 'Brand',
    width: 100,

  },
  {
    field: 'model',
    headerName: 'Model',
    width: 150,

    },
    {
    field: 'category',
    headerName: 'Category',
    width: 100,
      renderCell: ({ row }) => {
        return (
          <>
            <p>{row.category[1].name}</p>
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
          <ButtonContainer><IconButton><i className="fas fa-edit" style={{color:"goldenrod"}}></i></IconButton>
            <IconButton><i className="fas fa-trash-alt" style={{ color: "red" }} onClick={async() => {
              await confirm({ description: `Do you want to remove this product from your store?` })
                .then(() => deleteProduct(row._id));
            }}></i></IconButton>
</ButtonContainer>
)


}
  },


];

 function ProductList() {
   return (

 <GridContainer>
      <DataGrid
        style={{color:"black",fontSize:"1.1rem"}}
        rows={products}
        columns={columns}
        pageSize={20}
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
      <Title>Products</Title>
      {
        loading
          ?
          <LoaderContainer>
            <HashLoader loading={loading} color="#FFEC03" size={60} />
            </LoaderContainer>
          :
          <>
      <NewProduct>
      <Button color="yellow">Create New Product</Button>
      </NewProduct>
      <Container>
            <ProductList />
            </Container>
            </>
      }
      </>

)



}