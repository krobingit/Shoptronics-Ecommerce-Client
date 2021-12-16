import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { Input } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Badge from '@mui/material/Badge';
import * as React from 'react';

//styled-components
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
&:active{color: gold }
`
const SearchInput = styled(Input)`
border-radius:1rem;
`
const Initial = styled.span`
color:gold;
`

function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const history = useHistory();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);
  const btnStyles = { color: "inherit", fontSize: "1rem",letterSpacing:"0.8px", fontFamily: "Rubik, sans-serif" };
  return (
    <NavContainer>

      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}
      ><Title >
        <i className="fas fa-bolt" style={{ color: "gold", marginRight: "0.5rem" }}></i>
        <Initial>S</Initial>hoptronic<Initial>s</Initial>
      </Title></Link>
      <SearchInput
        icon={{ name: 'search', circular: true, link: true }}
        placeholder='Search...' />

      {!currentUser && <>
        <Button  sx={{ "&:hover": { backgroundColor: "#AA771C" }} } style={btnStyles} type="text"
          onClick={() => history.push("/login")}> <i className="fas fa-bolt" style={{ color: "gold", marginRight: "0.3rem" }}>
          </i>Sign in</Button>
        <Button sx={{ "&:hover": { backgroundColor: "#AA771C" }} } style={btnStyles} type="text"
          onClick={() => history.push("/register")}> <i className="fas fa-bolt" style={{ color: "gold", marginRight: "0.3rem" }}>
          </i>Register</Button></>}

      <Button sx={{ "&:hover": { backgroundColor: "#AA771C" } }} style={btnStyles}><Badge style={{marginRight:"0.7rem"}} color="secondary" badgeContent={99} >
        <ShoppingCartIcon /></Badge>Cart</Button>
      <Button sx={{ "&:hover": { backgroundColor: "#AA771C" } }} style={btnStyles}>
        <i className="fas fa-shopping-bag" style={{ marginRight: "5px" }} ></i>Orders</Button>
<Button sx={{ "&:hover": { backgroundColor: "#AA771C" }} } style={btnStyles}><FavoriteIcon style={{ marginRight: "5px" }} /> Wishlist</Button>

      {currentUser && <> <Button
        id="fade-button"
        aria-controls="fade-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{ color: "gold", textTransform: "none", fontSize: "1.25rem", marginTop: "0.4rem", fontFamily: "Rubik, sans-serif" }} type="text"
      >
      <i className="fas fa-user-circle" style={{ marginRight: "5px" }} ></i>{currentUser.username}<ArrowDropDownIcon />
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
          <MenuItem sx={{ "&:hover": { backgroundColor: "gold" },borderRadius:"0.5rem"} } style={btnStyles} onClick={() => dispatch({ type: "logOut" })}>Logout</MenuItem>
           <MenuItem  style={btnStyles}>Email: {currentUser.email}</MenuItem>
      </Menu>
</>}




    </NavContainer>



  )


}

export { Navbar }