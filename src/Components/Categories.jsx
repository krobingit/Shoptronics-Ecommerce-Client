import styled from "styled-components";
import { CategoryItems } from "./Data";
import { small } from "../responsive";
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const MainContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
`;
const HeaderText = styled.h1`
  color: rgb(52,52,52);
  letter-spacing: 2px;
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  margin: 0.5rem 0;
`;
const Line = styled.div`
  border: 1px solid #708090;
  width: 95%;
  margin: 0.5rem;
`;

const Category = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;
const CategoryName = styled.h2`
  width: min-content;
  color: #141e30;
  letter-spacing: 2px;
  border-radius: 0.5rem;
  padding: 0.2rem;
`;
const HideCard=styled.div`
position: absolute;
top: 0;
left: 0;
background-color: rgba(0,0,0, 0.4);
width:100%;
height:98%;
color: white;
display: none;
`
const ImageContainer = styled.div`
position:relative;
margin-bottom:1rem;
transition:all 0.5s;
&:hover{transform:scale(0.95)};
&:hover ${HideCard}{
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
transition: all 1s linear;
}
`
const Image = styled.img`
border:2px solid #141e30;
cursor:pointer;
width:30rem;
height:17rem;
border-radius:0.8rem;
${small({width:"23rem",height:"13rem"})}
`


function Categories({ history }) {
  return (
    <>
      <HeaderText>Featured Categories</HeaderText>
      <Line />
      <MainContainer>
        {CategoryItems.map(({ category, image }, idx) => (
          <CategoryItem
            key={idx}
            category={category}
            image={image}
            history={history}
          />
        ))}
    </MainContainer>

    </>
  );
}

function CategoryItem({ category, image, history }) {
 const handleClick=() => {
          history.push("/products", {
            searchcategory: category,
          });
        }
  return (
    <Category>
    <CategoryName>{category}</CategoryName>
    <ImageContainer>
      <Image
        src={image}
     />
     <HideCard>
     <IconButton><ShoppingCartIcon onClick={handleClick} style={{color:"gold",fontSize:"2rem"}}/></IconButton>
                        </HideCard>
     </ImageContainer>

    </Category>
  );
}
export { Categories };
