import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { Input } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Badge from "@mui/material/Badge";
import { small } from "../responsive";
import * as React from "react";
import { useConfirm } from "material-ui-confirm";
import { useContext } from "react";
import { SearchContext } from "../App";
import { commonRequest } from "../axiosreq";

//styled-components
const ProfilePic = styled.img`
  display: flex;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 0rem 1rem 0 0.5rem;
  object-fit: cover;
`;

export const NavContainer = styled.div`
  background: #141e30;
  color: white;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: space-evenly;
  font-family: "Patua One", cursive;
  flex-wrap: wrap;
  padding: 5px 0;
  position: sticky;
  top: 0;
  z-index: 1000;
`;
export const Title = styled.h1`
  letter-spacing: 2px;
  margin: 0rem;
  font-family: "Patua One", cursive;
  font-weight: 700;
  font-size: 2.1rem;
  &:active {
    color: gold;
  }
  ${small({ fontSize: "1.8rem" })}
`;
const SearchInput = styled(Input)`
  border-radius: 1rem;
  ${small({ width: "10.8rem" })}
`;
export const Initial = styled.span`
  color: gold;
`;
const NavActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 1.5rem;
  justify-content: space-evenly;
  align-items: center;
  ${small({ rowGap: "0.4rem", columnGap: "1rem" })};
`;

function Navbar({ tab = null }) {
  const confirm = useConfirm();
  const [, setSearch] = useContext(SearchContext);

  const handleLogin = () => {
    confirm({ description: `Do you want to log out from your account?` })
      .then(() => {
         commonRequest.get("/auth/logout",{
          withCredentials: true,
        })
        dispatch({ type: "logOut" });
      })
      .catch((err) => err && console.log(err));
  };
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
  const { quantity } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = React.useState(null);
  const { wishlistproducts } = useSelector((state) => state.wishlist);
  const btnStyles = {
    color: "inherit",
    fontSize: "1.1rem",
    fontWeight: "550",
    letterSpacing: "0.8px",
    fontFamily: "PT Sans Narrow, sans-serif",
  };
  const wishlistquantity = wishlistproducts.length;
  React.useEffect(() => {
    const getUser = async () => {
      await commonRequest
        .get(`/user/${currentUser?._id}`, {
          headers: {
            token: currentUser?.token,
          },
          withCredentials:true
        })
        .then((res) => setUser(res.data));
    };
    currentUser && getUser();
  }, [currentUser]);
  return (
    <NavContainer>
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <Title>
          <i
            className="fas fa-bolt"
            style={{ color: "gold", marginRight: "0.5rem" }}
          ></i>
          <Initial>S</Initial>hoptronic<Initial>s</Initial>
        </Title>
      </Link>
      {!tab && (
        <SearchInput
          onChange={(e) => setSearch(e.target.value)}
          icon={{ name: "search", circular: true, link: true }}
          placeholder="Search..."
        />
      )}
      <NavActions>
        <Button
          onClick={() => history.push("/products")}
          sx={{ "&:hover": { backgroundColor: "#AA771C" } }}
          style={{
            color: "gold",
            fontSize: "1.1rem",
            letterSpacing: "0.8px",
            fontFamily: "PT Sans Narrow, sans-serif",
          }}
          type="text"
        >
          <i
            className="fas fa-bolt"
            style={{ color: "gold", marginRight: "0.3rem", fontSize: "1.5rem" }}
          ></i>
          Products
        </Button>
        {/*Conditional rendering*/}
        {!currentUser && (
          <>
            <Button
              sx={{ "&:hover": { backgroundColor: "#AA771C" } }}
              style={btnStyles}
              type="text"
              onClick={() => history.push("/login")}
            >
              Sign in
            </Button>
            <Button
              sx={{ "&:hover": { backgroundColor: "#AA771C" } }}
              style={btnStyles}
              type="text"
              onClick={() => history.push("/register")}
            >
              Register
            </Button>
          </>
        )}

        {/*Cart Button with Badge*/}
        <Button
          onClick={() => history.push("/cart")}
          sx={{ "&:hover": { backgroundColor: "#AA771C" } }}
          style={btnStyles}
        >
          <Badge
            sx={{
              "& .MuiBadge-badge": {
                color: "black",
                fontWeight: "bold",
                backgroundColor: "gold",
              },
            }}
            style={{ marginRight: quantity > 0 && "0.6rem" }}
            color="secondary"
            badgeContent={quantity}
          >
            <ShoppingCartIcon
              sx={{ color: quantity > 0 && "gold", fontSize: "1.7rem" }}
            />
          </Badge>
          Cart
        </Button>

        {/*Orders Button*/}
        <Button
          onClick={() => history.push("/orders")}
          sx={{ "&:hover": { backgroundColor: "#AA771C" } }}
          style={btnStyles}
        >
          <i
            className="fas fa-shopping-bag"
            style={{ marginRight: "5px", fontSize: "1.6rem" }}
          ></i>
          Orders
        </Button>

        {/*Wishlist Button with Badge*/}
        <Button
          onClick={() => history.push("/wishlist")}
          sx={{ "&:hover": { backgroundColor: "#AA771C" } }}
          style={btnStyles}
        >
          <Badge
            sx={{
              "& .MuiBadge-badge": {
                color: "black",
                fontWeight: "bold",
                backgroundColor: "#eeeeee",
              },
            }}
            style={{ marginRight: wishlistquantity > 0 && "0.6rem" }}
            color="secondary"
            badgeContent={wishlistquantity}
          >
            <FavoriteIcon
              sx={{
                color: wishlistquantity > 0 && "#E31B23",
                fontSize: "1.7rem",
              }}
            />
          </Badge>{" "}
          Wishlist
        </Button>

        {/*Conditional Rendering if user logged in or not*/}
        {currentUser && (
          <>
            {" "}
            <Button
              id="fade-button"
              aria-controls="fade-menu"
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              style={{
                color: "gold",
                textTransform: "none",
                fontSize: "1.25rem",
                fontWeight: "550",
                fontFamily: "PT Sans Narrow, sans-serif",
              }}
              type="text"
            >
              {user?.profile_img ? (
                <ProfilePic alt="profile-pic" src={user?.profile_img} />
              ) : (
                <i
                  className="fas fa-user-circle"
                  style={{ marginRight: "5px" }}
                ></i>
              )}
              {user?.username}
              <ArrowDropDownIcon />
            </Button>
            <Menu
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              {currentUser.isAdmin && (
                <MenuItem
                  sx={{
                    "&:hover": { backgroundColor: "gold" },
                    borderRadius: "0.5rem",
                  }}
                  style={btnStyles}
                  onClick={() => history.push("/adminHome")}
                >
                  To Admin Dashboard
                </MenuItem>
              )}
              <MenuItem
                sx={{
                  "&:hover": { backgroundColor: "gold" },
                  borderRadius: "0.5rem",
                }}
                style={btnStyles}
                onClick={() => history.push(`/userEdit/${currentUser._id}`)}
              >
                Update Profile
              </MenuItem>
              <MenuItem
                sx={{
                  "&:hover": { backgroundColor: "gold" },
                  borderRadius: "0.5rem",
                }}
                style={btnStyles}
                onClick={() => handleLogin()}
              >
                Logout
              </MenuItem>
              <MenuItem style={btnStyles}>Email: {currentUser.email}</MenuItem>
            </Menu>
          </>
        )}
      </NavActions>
    </NavContainer>
  );
}

export { Navbar };
/*
 */
