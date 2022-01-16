import { Checkbox } from 'semantic-ui-react'
import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const Container = styled.div`
margin:0.3rem;
`
export function Brand({ brandValue,filters,setFilters })
{
 const dispatch = useDispatch();
 const {brand}=useSelector(state=>state.brand)
 const [checked, setChecked] = useState(false);


 const handleChange = (e, data) => {
  setChecked(data.checked)


  if (!data.checked) {
dispatch({type:"RemoveBrand",payload:brandValue})
   setFilters({ ...filters, brand })
  }
  else if (data.checked) {
dispatch({type:"AddBrand",payload:brandValue})
   setFilters({ ...filters, brand  });
  }
 }
 return (
<Container>
  <Checkbox label={brandValue} checked={checked}
   onChange={handleChange} />
</Container>
   )


}