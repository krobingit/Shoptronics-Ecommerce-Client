import {useEffect,useState} from 'react';
import styled from 'styled-components';
import { commonRequest } from '../axiosreq';

const ProductContainer = styled.div`
display:flex;
flex-wrap:wrap;
`
export function Products() {

 const [products, setProducts] = useState(null);
 const getProducts = async () => {
  try {
   const res = await commonRequest.get("/product");
   setProducts(res.data);
   setLoading(false);
  }
  catch (err) {
   console.log(err)
   setLoading(false);
  }
 }

 useEffect(() => {
  getProducts();
 }, [])

 return (
  <ProductContainer>



  </ProductContainer>


)

}