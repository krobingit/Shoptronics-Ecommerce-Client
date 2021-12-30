import styled from 'styled-components';
import notfound from '../Assets/404.png';
import { Button } from 'semantic-ui-react';

const Container = styled.div`
min-height:100vh;
position:relative;
`

const NotFoundImage = styled.img`
min-height:100vh;
width:100%;
object-fit:cover;
`
const Btn = styled(Button)`
position:absolute;
bottom:2rem;
left:2rem;
`
export const NotFound = () => {

 return (
  <Container>
   <NotFoundImage src={notfound} />
   <Btn color="black" >Go to Shoptronics Home</Btn>
   </Container>

)


}