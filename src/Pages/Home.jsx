import {Navbar} from '../Components/Navbar'
import { Slider } from '../Components/Slider';
import styled from 'styled-components';
import { small } from '../responsive';

export const Title = styled.h2`
background-color: #ffcd00;
background-image: linear-gradient(314deg, #ffcd00 0%, #141e30 75%);
font-size:1.8rem;
text-align:center;
margin:0 0 2rem 0;
text-shadow:2px 2px #141e30;
color:gold;
letter-spacing:3px;
font-family: 'Fira Sans', sans-serif;
${small({fontSize:"1.5rem"})}
`
function Home(){

 return (
  <>
   <Navbar />
       <Slider />
         <Title>HOME
          </Title>
</>
)



}


export {Home}