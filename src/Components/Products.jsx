import { useEffect, useState,forwardRef } from 'react';
import { commonRequest } from '../axiosreq';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { Title } from '../Pages/Home';
import { SpinnerInfinity } from 'spinners-react';
import styled from 'styled-components';
import { Product } from './Product';
import { useContext } from 'react';
import { SearchContext } from '../App'
import { Categories, Brands} from './Data';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { small } from '../responsive';
import Button from '@mui/material/Button';
import { useDispatch } from "react-redux";
import { Category } from "./Category";
import { Brand } from "./Brand";

const Container = styled.div`
display:flex;
padding:0.5rem
`
const LoaderContainer = styled.div`
display:flex;
width:100%;
flex-direction:column;
align-items:center;
justify-content:center;
`

const ProductContainer = styled.div`
display:flex;
width:75%;
flex-wrap:wrap;
align-items:center;
justify-content:center;
`

const FilterContainer = styled.div`
  overflow: hidden;
  border-radius: 1rem;
  width: 25%;
  padding: 0.5rem;
  height: max-content;
  ${small({ width: "14rem", padding: "0.1rem" })}
`;


const SideContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  height: 14rem;
  overflow: scroll;
  margin-bottom: 1rem;
`;

const ProductCount = styled.div`
display:flex;
justify-content:center;
`
const Count = styled.p`
color:#141e30;
font-weight:700;
font-size:1.3rem;
${small({fontSize:"1rem"})}
`
const Empty = styled.p`
color:orangered;
font-weight:700;
font-size:1.3rem;
${small({fontSize:"1rem"})}
`

export function Products() {
  const [search] = useContext(SearchContext);

    const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    category: [],
    brand: []
  });
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
  const [loading, setLoading] = useState(false);
  const [productsList,setProductsList]=useState(null)
  const [notify, setNotify] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
    try {
         setLoading(true)
      const res = await commonRequest.get("/product");
      setProductsList(res.data);
    }
    catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

    getProducts();

  }, [])

 useEffect(() => {
    const filterProducts =  () => {
      setLoading(true);
      var filteredProducts = productsList;

      if (productsList && filters) {
        if (search.length > 1) {
          filteredProducts = filteredProducts.filter(
            (product) =>
              product.productName
                .toLowerCase()
                .includes(search.trim().toLowerCase()) ||
              product.category
                .toLowerCase()
                .includes(search.trim().toLowerCase())
          );
          setProducts(filteredProducts);
          setLoading(true);
        }

        for (let key in filters) {
          if (filters[key].length > 0) {

            if (key === "brand") {
              filteredProducts = filteredProducts.filter((product) =>
                filters["brand"].includes(product.brand)
              );
              setProducts(filteredProducts);
              setLoading(true);
            }
            if (key === "category") {
              filteredProducts = filteredProducts.filter((product) =>
                filters["category"].includes(product.category)
              );
              setProducts(filteredProducts);
              setLoading(true);
            }
          }
        }
      }
      console.log(filters);
      setLoading(false);
      setProducts(filteredProducts);
    };
    filterProducts();
 }, [search, filters,productsList]);

  const btnStyle = { color: "red" };
  return (
    <>
   <Title>PRODUCTS
          </Title>
      <Container>
         <FilterContainer>
        <h3>FILTERS</h3>
         <ProductCount>
           {
             (products && products.length > 0) ?
              <Count>{products.length} Products Found</Count> :
                  <Empty>No results found</Empty>
            }
            </ProductCount>
        <Button
          style={btnStyle}
          onClick={() => {
            dispatch({ type: "ClearGender" });
            dispatch({ type: "ClearCategories" });
            dispatch({ type: "ClearBrands" });
            setFilters({
              gender:[],
              category:[],
              brand:[],
              rating: [],
              price: [],
              year: [],
            });
          }}
        >
          Clear All Filters
          <DeleteOutlineIcon />
        </Button>
        <h4>
          Categories
        </h4>


            <Button
              style={btnStyle}
              variant="text"
              onClick={() => {
                dispatch({ type: "ClearCategories" });
                setFilters({ ...filters, category:[] });
              }}
            >
              <DeleteOutlineIcon />
            </Button>
            <SideContainer>
              {Categories.map((categoryValue, idx) => (
                  <Category
                    key={idx}
                    categoryValue={categoryValue}
                    filters={filters}
                    setFilters={setFilters}
                  />
                ))}
            </SideContainer>


        <h4>
          Brands
        </h4>

            <Button
              style={btnStyle}
              variant="text"
              onClick={() => {
                dispatch({ type: "ClearBrands" });
                setFilters({ ...filters, brand:[] });
              }}
            >
              <DeleteOutlineIcon />
            </Button>
            <SideContainer>
              {Brands.map((brandValue, idx) => (
                  <Brand
                    key={idx}
                    brandValue={brandValue}
                    filters={filters}
                    setFilters={setFilters}
                  />
                ))}
            </SideContainer>
        <h4>Price Range</h4>

      </FilterContainer>
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

                {products && products.map(({ name, price, category, brand, image, _id,instock }) =>
             //product component
             <Product key={_id} name={name} instock={instock} price={price} category={category} brand={brand}
               image={image} _id={_id} setNotify={setNotify} handleClick={handleClick} TransitionLeft={TransitionLeft}/>
           )}

         </ProductContainer>
</>


}

  </Container>
</>

)

}
