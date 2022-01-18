import { useEffect, useState,forwardRef,useContext } from 'react';
import { commonRequest } from '../axiosreq';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { Title } from '../Pages/Home';
import { SpinnerCircularFixed } from 'spinners-react';
import styled from 'styled-components';
import { Product } from './Product';
import {  SearchContext } from '../App'
import { Categories, Brands, PriceRange} from './Data';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { small } from '../responsive';
import Button from '@mui/material/Button';
import { useDispatch } from "react-redux";
import { Category } from "./Category";
import { Brand } from "./Brand";
import { Price } from "./PriceRange";
import {useLocation} from "react-router-dom"


const Container = styled.div`
display:flex;
padding:0.5rem
`
const LoaderContainer = styled.div`
display:flex;
width:100%;
align-items:center;
justify-content:center;
`

const ProductContainer = styled.div`
display:flex;
width:75%;
flex-wrap:wrap;
align-items:center;
justify-content:space-evenly;
  ${small({ width: "62%", padding: "0.1rem" })}
`

const FilterContainer = styled.div`
  border-radius: 1rem;
  width: 25%;
  padding: 0.5rem;
  height: max-content;
position:sticky;
top: 7rem;
height:80vh;
overflow: scroll;
  ${small({ width: "38%", padding: "0.1rem",top:"8rem" })}
`;


const SideContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  height: max-content;
  margin-bottom: 1rem;
${small({overflowX:"scroll"})}
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
  const location = useLocation();
  const [search, setSearch] = useContext(SearchContext);
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [productsList,setProductsList]=useState(null)
  const [notify, setNotify] = useState(false);
  const [filters, setFilters] = useState({
    category: [],
    brand: [],
    price:[]
  });
    const dispatch = useDispatch();
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

  useEffect(() => {

    const state = () => {
      if (location.state) {
        if (location.state.searchcategory) {
          let category = [];
          category.push(location.state.searchcategory)
          setFilters({category })
        }
        if (location.state.searchbrand) {
          let brand = [];
          brand.push(location.state.searchbrand)
          setFilters({  brand })
        }
      }
    }
    state();

  },[location.state])

  useEffect(() => {
    const getProducts = async () => {
      try {
      setLoading(true)
      const res = await commonRequest.get("/product")
        setProductsList(res.data);
      setLoading(false)
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
      let products = productsList;
      var filteredProducts = products;

      if (products && filters) {
        if (search.length > 1) {
          filteredProducts = filteredProducts.filter(
            (product) =>
              product.name
                .toLowerCase()
                .includes(search.trim().toLowerCase()) ||
              product.category
                .toLowerCase()
                .includes(search.trim().toLowerCase())
          );
          setProducts(filteredProducts)
        }

        for (let key in filters) {
          if (filters[key].length > 0) {

            if (key === "brand") {
              filteredProducts = filteredProducts.filter((product) =>
                filters["brand"].includes(product.brand)
              );
              setProducts(filteredProducts);

            }
            if (key === "category") {
              filteredProducts = filteredProducts.filter((product) =>
                filters["category"].includes(product.category)
              );
              setProducts(filteredProducts);

            }
              if (key === "price") {
              let PRICE = filters["price"];
              filteredProducts = filteredProducts.filter(
                (product) =>
                  product.price > PRICE[0] && product.price < PRICE[1]
              );
              filteredProducts.sort((a, b) => {
                if (a.price > b.price) return 1;
                else return -1;
              });
              setProducts(filteredProducts);
            }
          }
        }
      }

setProducts(filteredProducts);
    };
   filterProducts();

 }, [search, filters,productsList]);


//console.log(filters);

  const btnStyle = { color: "red" };
  return (
    <>
   <Title>PRODUCTS
          </Title>
      <Container>
           {
       loading ?
         <LoaderContainer>
    <SpinnerCircularFixed size={70} thickness={80} speed={163} color="#141e30" secondaryColor="gold" />
         </LoaderContainer>
         :
         <>
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
            dispatch({ type: "ClearCategories" });
            dispatch({ type: "ClearBrands" });
            setFilters({
              category:[],
              brand:[],
              price: []
            });
            setSearch("")
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
                {
PriceRange.map(({start,end},idx)=>
          <Price
    key={idx}
            start={start}
            end={end}
            filters={filters}
            setFilters={setFilters}
          />
        )}
      </FilterContainer>

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
/*  <SpinnerInfinity size={75} thickness={140} speed={150} color="#141e30" secondaryColor="gold" />*/