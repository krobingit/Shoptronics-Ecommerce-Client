import { Input } from 'semantic-ui-react';
import styled from "styled-components";
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
const InputContainer = styled.div`
display:flex;
margin:1rem;
`
const Container = styled.div`
display: flex;
flex-direction:column;
  justify-content: center;
  align-items: center;
background:#141e30;
padding:0.5rem;
`

const Text = styled.h3
 `
text-align:center;
color:white;
`
function NewsLetter()
{
 return (
  <Container>
  <Text>Grab Discounts on Products and updates sent via email!
    Subscribe to us!</Text>
   <InputContainer>
    <Input placeholder="Your Email"/>
    <IconButton style={{color:'white'}}><SendIcon /></IconButton>
   </InputContainer>
</Container>

)


}

export { NewsLetter }