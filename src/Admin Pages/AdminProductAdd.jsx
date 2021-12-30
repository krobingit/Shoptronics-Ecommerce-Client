import {  useHistory } from 'react-router-dom';
import { AdminNav } from '../Components/AdminNavBar';
import { useFormik } from "formik";
import { Form } from 'semantic-ui-react';
import { commonRequest } from '../axiosreq';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import { productSchema } from './AdminProductEdit';


const FormContainer = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
padding:1rem;
`


export const AdminProductAdd = () => {
 const { currentUser } = useSelector(state=>state.user)
 return  <AddProduct  user={currentUser}/>
}

//conditional rendering --only when product has fetched the data, this function component will be returned
const AddProduct = ({  user }) => {
  let history = useHistory();
    const ToastSuccess = () => {
  return toast.success("Product Created Successfully", {
    position: "bottom-right",
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    theme: "colored",
  });
  };

  const { handleChange, handleSubmit, handleBlur, errors, touched, values } = useFormik({
   initialValues: {
    name: "",
    brand: "" ,
    description: "",
    price: "",
    image: "",
    category: "",
    model: ""
   },
   validationSchema: productSchema,
   onSubmit: async (values) => {
    console.log(values)
try{
await commonRequest.post(`/product/`, values,
  {
  headers:{token: user.token}
 }).then(() => {
  ToastSuccess()
  setTimeout(() => {
  history.push("/adminProductList")
  },2500)
 } )


    }
    catch (err)
{
console.log("Error updating user",err)


}
   }

  })

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

  return (
   <>
    <AdminNav />

      <FormContainer>


       <Form style={formStyles} onSubmit={handleSubmit}>
        <h3 style={{ textAlign: "center", letterSpacing: "1.5px", color: "#4f2f5e" }}><i className="fas fa-plus-square"></i> CREATE PRODUCT</h3>
        <Form.Input onChange={handleChange} onBlur={handleBlur} value={values.name}
         error={errors.name && touched.name && errors.name}
         fluid
         label='Product Name'
         placeholder='Name'
         id='name'
         name="name"
         type="text"
        />

        <Form.Input onChange={handleChange} onBlur={handleBlur} value={values.price}
         error={errors.price && touched.price && errors.price}
         fluid
         label='Price'
         placeholder='Price'
         id="price"
         name="price"
         type="text"
        />

        <Form.Input onChange={handleChange} onBlur={handleBlur} value={values.description}
         error={errors.description && touched.description && errors.description}
         fluid
         label='Description'
         placeholder='Description'
         id='description'
         name="description"
         type="text"
        />
        <Form.Input onChange={handleChange} onBlur={handleBlur} value={values.brand}
         error={errors.brand && touched.brand && errors.brand}
         fluid
         label='Brand'
         placeholder='Brand'
         id="brand"
         name="brand"
         type="text"
        />
        <Form.Input onChange={handleChange} onBlur={handleBlur} value={values.image}
         error={errors.image && touched.image && errors.image}
         fluid
         label='Product Image URL'
         placeholder='Image'
         id="image"
         name="image"
         type="text"
        />
        <Form.Input onChange={handleChange} onBlur={handleBlur} value={values.category}
         error={errors.category && touched.category && errors.category}
         fluid
         label='Product Category'
         placeholder='Category'
         id="category"
         name="category"
         type="text"
        />
        <Form.Input onChange={handleChange} onBlur={handleBlur} value={values.model}
         error={errors.model && touched.model && errors.model}
         fluid
         label='Product Model'
         placeholder='Model'
         id="model"
         name="model"
         type="text"
        />
        <Button type="submit" style={{color:"inherit"}} color="yellow">Add Product</Button>
         <ToastContainer
          position="bottom-right"
          autoClose={3500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
        />
       </Form>
        <Button style={{marginRight:"auto",marginLeft:"2rem"}} onClick={() => history.push("/adminProductList")} color="yellow">Go to Products</Button>
      </FormContainer>

   </>
  )

 }