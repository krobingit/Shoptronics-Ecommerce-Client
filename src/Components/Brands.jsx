import styled from "styled-components";
import { BrandItems } from "./Data";
import { small } from '../responsive';

const MainContainer = styled.div`
display:flex;
flex-wrap:wrap;
align-items:center;

justify-content:space-evenly;
`
const HeaderText = styled.h1`
color:rgb(52,52,52);
letter-spacing:2px;
width:100%;
text-align:center;
text-transform:uppercase;
margin:0.5rem 0
`
const Line = styled.div`
border:1px solid #708090;
width:95%;
margin:0.5rem;
`

const Brand = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
margin-bottom:1rem;
`
const BrandName = styled.h2`
width:min-content;
color:#141e30;
letter-spacing:2px;
border-radius:0.5rem;
padding:0.2rem;
opacity:0.9;

`
const Image = styled.img`
cursor:pointer;
margin-bottom:1rem;
width:30rem;
height:17rem;
border-radius:0.8rem;
${small({width:"23rem",height:"13rem"})}
`

function Brands({  history }) {

  return (
<>
    <HeaderText>Featured Brands</HeaderText>
    <Line/>
       <MainContainer>
    {BrandItems.map(({ brand, image },idx) =>
     <BrandItem key={idx} brand={brand} image={image} history={history} />
)}


    </MainContainer>
    </>
  );
}

function BrandItem({brand,image,history})
{
const handleClick=() => {
          history.push("/products", {
           searchbrand:brand,
          });
   }

 return (
 <Brand >
      <BrandName>{brand}</BrandName>
   <Image onClick={handleClick} src={image}></Image>
     </Brand>

)


}
export { Brands };