import styled from "styled-components";
import { CategoryItems } from "./Data";
import { small } from "../responsive";


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
const Image = styled.img`
  cursor: pointer;
  margin-bottom: 1rem;
  width: 30rem;
  height: 17rem;
transition:all 0.5s;
&:hover{transform:scale(0.95)};
  border-radius: 0.8rem;
  ${small({ width: "23rem", height: "13rem" })}
`;

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
      <Image
        onClick={handleClick}
        src={image}
    ></Image>

    </Category>
  );
}
export { Categories };
