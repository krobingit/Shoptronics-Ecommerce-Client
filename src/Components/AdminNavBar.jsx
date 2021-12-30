import styled from 'styled-components';
import { Initial, NavContainer, Title } from './Navbar';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
//import Badge from '@mui/material/Badge';
import { small } from '../responsive';
import * as React from 'react';


const Actions = styled.div`
display:flex;
flex-wrap:wrap;
gap:1rem;
justify-content:space-evenly;
${small({gap:"0"})}
`

export const AdminNav = () => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
 };
 const btnStyles = { color: "inherit", fontSize: "1.1rem",fontWeight:"550", letterSpacing: "0.8px", fontFamily: "PT Sans Narrow, sans-serif" };
 const history = useHistory();
 const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);
 return (

  <NavContainer style={{background:"#041b2d"}}>

<Title style={{fontSize:"1.7rem",marginLeft:"0.7rem",cursor:"pointer"}} onClick={()=>history.push("/adminHome")}>
        <i className="fas fa-bolt" style={{ color: "gold", marginRight: "0.5rem" }}></i>
        <Initial>S</Initial>hoptronic<Initial>s</Initial> <Initial>A</Initial>dmi<Initial>n</Initial>
   </Title>
     <Actions>
       <Button onClick={() => history.push("/adminHome")} sx={{ "&:hover": { backgroundColor: "#AA771C" } }} style={{ color: "inherit", fontSize: "1.2rem", letterSpacing: "0.8px", fontFamily: "PT Sans Narrow, sans-serif" }} type="text">
         <i className="fas fa-home" style={{ color: "gold", marginRight: "0.3rem",fontSize:"1.5rem" }} ></i>Home</Button>
    <Button onClick={() => history.push("/adminProductList")} sx={{ "&:hover": { backgroundColor: "#AA771C" } }} style={{ color: "inherit", fontSize: "1.2rem", letterSpacing: "0.8px", fontFamily: "PT Sans Narrow, sans-serif" }} type="text">
          <i className="fas fa-bolt" style={{ color: "gold", marginRight: "0.3rem",fontSize:"1.5rem" }}>
    </i>Inventory</Button>
   <Button
         sx={{ "&:hover": { backgroundColor: "#AA771C" } }} style={{ color: "white", fontSize: "1.2rem", letterSpacing: "0.8px", fontFamily: "PT Sans Narrow, sans-serif" }}
     onClick={()=>history.push("/adminOrderList")}    type="text"><i className="fas fa-shopping-bag" style={{ marginRight: "0.4rem", color: "gold" }}></i> Orders</Button>
   <Button
         sx={{ "&:hover": { backgroundColor: "#AA771C" } }} style={{ color: "white", fontSize: "1.2rem", letterSpacing: "0.8px", fontFamily: "PT Sans Narrow, sans-serif" }}
     onClick={() => history.push("/adminUserList")}    type="text"><i className="fas fa-users" style={{ marginRight: "0.4rem", color: "gold", fontSize: "1.3rem" }}></i> Users</Button>
   <> <Button
        id="fade-button"
        aria-controls="fade-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{ color: "gold", textTransform: "none", fontSize: "1.25rem",fontWeight:
"550", fontFamily: "PT Sans Narrow, sans-serif"  }} type="text"
      >
      <i className="fas fa-user-shield" style={{ marginRight: "5px" }} ></i>{currentUser.username}<ArrowDropDownIcon />
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
            <MenuItem sx={{
            "&:hover": { backgroundColor: "gold" },
              borderRadius: "0.5rem"
            }} style={btnStyles} onClick={()=>{
history.push("/")
      }}>Back to Shoptronics Home</MenuItem>
          <MenuItem sx={{
            "&:hover": { backgroundColor: "gold" },
              borderRadius: "0.5rem"
            }} style={btnStyles} onClick={()=>{
dispatch({ type: "logOut" })
history.push("/")
      }}>Logout</MenuItem>
           <MenuItem  style={btnStyles}>Email: {currentUser.email}</MenuItem>
      </Menu>
        </>

</Actions>
  </NavContainer>


)


}