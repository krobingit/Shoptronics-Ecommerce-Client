import { useParams, useHistory } from 'react-router-dom';
import { AdminNav } from '../Components/AdminNavBar';
import * as yup from 'yup';
import { useFormik } from "formik";
import { Form } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { commonRequest } from '../axiosreq';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';
import SyncLoader from "react-spinners/SyncLoader";
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import { Checkbox } from 'semantic-ui-react';

const LoaderContainer = styled.div`
display:flex;
min-height:100vh;
align-items:center;
justify-content:center;
`
const FormContainer = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
padding:1rem;
`

   export const productSchema=yup.object({
        name:yup.string().required("Please Enter Product Name"),
        brand:yup.string().required("Please Enter Brand"),
        price:yup.number().required("Please Enter Price"),
        image:yup.string().required("Please Enter Image URL").url("Invalid URL"),
        description:yup.string().required("Please Enter description"),
    category: yup.string().required("Please Enter Category"),
     model: yup.string().required("Please Enter Product Model"),
        instock:yup.boolean()

    })
export const AdminProductEdit = () => {
 const { currentUser } = useSelector(state=>state.user)
 const [product, setProduct] = useState(null);
 const [loading, setLoading] = useState(true);

 const { id } = useParams();

 useEffect(() => {
  const getProduct = async () => {
   await commonRequest.get(`/product/${id}`).then((res) => setProduct(res.data));
   setTimeout(() =>
{setLoading(false)},1000)
  }
  getProduct();

 }, [id])
 return product && <UpdateProduct  user={currentUser} loading={loading} product={product}/>
}

//conditional rendering --only when product has fetched the data, this function component will be returned
const UpdateProduct = ({ loading, product, user }) => {
  let history = useHistory();
    const [check, setCheck] = useState(product.instock);
    const ToastSuccess = () => {
  return toast.success("Updated Product Successfully", {
    position: "bottom-right",
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    theme: "colored",
  });
  };

  const { handleChange, handleSubmit, handleBlur, errors, touched, values } = useFormik({
   initialValues: {
    name: product.name,
    brand: product.brand ,
    description: product.description,
    price: Math.round(product.price),
    image: product.image,
    category: product.category,
      model: product.model,
    instock:product.instock
   },
   validationSchema: productSchema,
   onSubmit: async (values) => {
    console.log(values)
try{
await commonRequest.put(`/product/${product._id}`, values,
  {
  headers:{token: user.token}
  }).then(() =>
    ToastSuccess())
   setTimeout(() => {
                history.push("/adminProductList");
              }, 2500);
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
    {
     loading
      ?
      <LoaderContainer>
       <SyncLoader loading={loading} margin="5px" color="#FFEC03" size={18} />
      </LoaderContainer>
      :
      <FormContainer>


       <Form style={formStyles} onSubmit={handleSubmit}>
        <h3 style={{ textAlign: "center", letterSpacing: "1.5px", color: "#4f2f5e" }}><i className="fas fa-edit"></i> EDIT PRODUCT</h3>
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
         placeholder='description'
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
              <Checkbox style={{ marginBottom: "2rem",fontSize:"1.2rem" }} label='In Stock'
                checked={check ? (values.instock = true) : (values.instock = false)} onClick={(e) => setCheck(e.target.checked)} name="instock" id="instock" />
        <Button type="submit" color="green">Update Product</Button>
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
    }
   </>
  )

 }