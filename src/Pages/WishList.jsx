import {Navbar} from '../Components/Navbar'
import styled from 'styled-components';
import { small } from '../responsive';
import { useSelector } from 'react-redux';
import { WishListComp } from '../Components/wishList';
import { Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import wishlistEmpty from '../Assets/wishlistEmpty.png'
import { Title } from './Home';

const Wish = styled.div`
min-height:100vh;

`
const WishListEmptyContainer = styled.div`
display:flex;
justify-content:center;
`
const WishListEmptyImage = styled.img`
margin-top:2rem;
object-fit:cover;
mix-blend-mode:multiply;
${small({ width: "28rem" })}
`
export const WishList=()=>
{
 const { currentUser } = useSelector(state => state.user);
 const { wishlistproducts } = useSelector(state => state.wishlist);
 const history=useHistory();
 return (
    <Wish>
  <Navbar tab="wishlist"/>
   <Title><i className="fas fa-heart"></i> WISHLIST{wishlistproducts.length>0 && `(${wishlistproducts.length})`}</Title>
    <Button style={{ marginLeft: "3rem" }} color="yellow" onClick={() => history.push("/products")}>Continue to Shop</Button>
{!currentUser && history.push("/login")}
   {currentUser && wishlistproducts.length > 0
    ?
    <WishListComp />
    :
    <WishListEmptyContainer>
     <WishListEmptyImage src={wishlistEmpty} />
</WishListEmptyContainer>}

   </Wish>

)

}