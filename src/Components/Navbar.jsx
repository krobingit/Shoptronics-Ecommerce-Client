import styled from 'styled-components';
import { Link,useHistory } from 'react-router-dom';
import { Input } from 'semantic-ui-react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';
const NavContainer = styled.div`
background:#141e30;
color:white;
display:flex;
gap:1rem;
align-items:center;
justify-content:space-evenly;
font-family: 'Patua One', cursive;
flex-wrap:wrap;
padding: 8px 0;
position:sticky;
top:0;
`
const Title = styled.h1`
letter-spacing:2px;
margin:0rem;
font-family: 'Patua One', cursive;
font-weight:700;
flex:1;
`
const SearchInput = styled(Input)`
border-radius:1rem;
`
const Initial = styled.span`
color:gold;
`

function Navbar() {
 const history = useHistory();
 return (
  <NavContainer>

   <Link to="/" style={{textDecoration:"none",color:"inherit"}}><Title >
 <i className="fas fa-bolt" style={{color:"gold",marginRight:"0.5rem"}}></i>
   <Initial>S</Initial>hoptronic<Initial>s</Initial>
   </Title></Link>
<SearchInput
    icon={{ name: 'search', circular: true, link: true }}
    placeholder='Search...' />
   <Button style={{ color: "inherit", fontSize: "1.2rem",font:"inherit" }} type="text"
    onClick={() => history.push("/login")}>Sign in</Button>
   <Button style={{ color: "inherit", fontSize: "1.2rem", font: "inherit" }} type="text"
   onClick={() => history.push("/register")}>Register</Button>
   <Button style={{ color: "inherit",fontSize:"1.2rem",font:"inherit" }}><ShoppingCartIcon style={{marginRight:"5px"}}/> Cart</Button>
   <Button style={{ color: "inherit", fontSize: "1.2rem",font:"inherit" }}><i className="fas fa-shopping-bag" style={{marginRight:"5px"}} ></i> My Orders</Button>





  </NavContainer>



)


}

export {Navbar}