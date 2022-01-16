import { Checkbox } from 'semantic-ui-react'
import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const Container = styled.div`
margin:0.3rem;
`
export function Category({ categoryValue,filters,setFilters })
{
 const dispatch = useDispatch();
 const {category}=useSelector(state=>state.category)
 const [checked, setChecked] = useState(false);


 const handleChange = (e, data) => {
  setChecked(data.checked)
  if (!data.checked) {
dispatch({type:"RemoveCategory",payload:categoryValue})
   setFilters({ ...filters, category })
  }
  else if (data.checked) {
dispatch({type:"AddCategory",payload:categoryValue})
   setFilters({ ...filters, category  });
  }
 }
 return (
<Container>
  <Checkbox label={categoryValue} checked={checked}
   onChange={handleChange} />
</Container>
   )


}