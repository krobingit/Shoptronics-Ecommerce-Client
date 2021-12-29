import { useEffect, useState,forwardRef } from 'react';

import { commonRequest } from '../axiosreq';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { Title } from '../Pages/Home';
import { SpinnerInfinity } from 'spinners-react';
import styled from 'styled-components';
import { Product } from './Product';


const Container = styled.div`
padding:0 2rem;
`
const LoaderContainer = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
`

const ProductContainer = styled.div`
display:flex;
flex-wrap:wrap;
align-items:center;
justify-content:center;
`


export function Products() {

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [open, setOpen] = useState(false);
  const [transition, setTransition] = useState(undefined);

  const handleClick = (Transition) => {
  setTransition(() => Transition);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}

  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  const [notify, setNotify] = useState(false);
  const getProducts = async () => {
    try {
      const res = await commonRequest.get("/product");
      setProducts(res.data);
      setLoading(false)
    }
    catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    getProducts();

  }, [])



  return (
    <>
   <Title>PRODUCTS
          </Title>
   <Container>
     {
       loading ?
         <LoaderContainer>
              <SpinnerInfinity size={75} thickness={140} speed={150} color="#141e30" secondaryColor="gold" />
                   <h3 style={{ margin:"1rem 0",letterSpacing:"1px",fontFamily: "'Patua One', cursive", fontSize: "1.5rem" }}>
                Getting your products..</h3>
         </LoaderContainer>
         :
         <>
              <ProductContainer>
                        { notify && <>
      <Snackbar TransitionComponent={transition}
        key={transition ? transition.name : ''} open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
         Item removed from Wishlist!
        </Alert>
      </Snackbar>
                </>}

                {products.map(({ name, price, category, brand, image, _id }) =>
             //product component
             <Product key={_id} name={name} price={price} category={category} brand={brand}
               image={image} _id={_id} setNotify={setNotify} handleClick={handleClick} TransitionLeft={TransitionLeft}/>
           )}

         </ProductContainer>
</>


}

  </Container>
</>

)

}