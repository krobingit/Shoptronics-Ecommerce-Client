import {Navbar} from '../Components/Navbar'
import { Slider } from '../Components/Slider';
import styled from 'styled-components';
import { small } from '../responsive';

const HomeTitle=styled.h2`
font-size:1.8rem;
text-align:center;
margin:0 0 2rem 0;
text-shadow:1.5px 1px #141e30;
color:gold;
letter-spacing:3px;
background:black;
font-family: 'Fira Sans', sans-serif;
${small({fontSize:"1.5rem"})}
`
function Home(){

 return (
  <>
   <Navbar />
       <Slider />
         <HomeTitle>HOME
          </HomeTitle>
</>
)



}


export {Home}