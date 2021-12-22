import {Navbar} from '../Components/Navbar'
import styled from 'styled-components';
import { small } from '../responsive';
import { useSelector } from 'react-redux';
import { WishListComp } from '../Components/wishList';
import { Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import wishlistEmpty from '../Assets/wishlistEmpty.png'


const Title=styled.h2`
font-size:1.8rem;
text-align:center;
margin:0 0 2rem 0;
text-shadow:1.5px 1px #141e30;
color:gold;
letter-spacing:3px;
background:linear-gradient(135deg, #121721 0%, #000000 100%) fixed;
font-family: 'Fira Sans', sans-serif;
${small({fontSize:"1.5rem"})}
`
const WishListEmptyContainer = styled.div`
display:flex;
justify-content:center;
`
const WishListEmptyImage = styled.img`
margin-top:2rem;
object-fit:cover;
`
export const WishList=()=>
{
 const { currentUser } = useSelector(state => state.user);
 const { wishlistproducts } = useSelector(state => state.wishlist);
 const history=useHistory();
 return (
  <>
  <Navbar />
   <Title>WishList</Title>
    <Button style={{ marginLeft: "3rem" }} color="yellow" onClick={() => history.push("/products")}>Continue to Shop</Button>
{!currentUser && history.push("/login")}
   {currentUser && wishlistproducts.length > 0
    ?
    <WishListComp />
    :
    <WishListEmptyContainer>
     <WishListEmptyImage src={wishlistEmpty} />
</WishListEmptyContainer>}

   </>

)

}