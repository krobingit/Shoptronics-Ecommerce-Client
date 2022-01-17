import { useState } from 'react';
import MultiRangeSlider from 'multi-range-slider-react';
import styled from 'styled-components';

const Container = styled.div`
margin-bottom:1rem;
`

export function Price({start,end,filters,setFilters})
{
const [minValue, setMinValue] = useState(start);
 const [maxValue, setMaxValue] = useState(end);


const handleInput = (e) => {
 setMinValue(e.minValue);
	setMaxValue(e.maxValue);

   setFilters({ ...filters, price:[e.minValue,e.maxValue]  });
};
 return (
		<Container>
			<h4>Between ₹{start} and ₹{end}</h4>
<MultiRangeSlider
			min={start}
			max={end}
			step={5}
			ruler={false}
			label={true}
			preventWheel={false}
			minValue={minValue}
			maxValue={maxValue}
			onInput={(e) => {
				handleInput(e);
			}}
   />
   </Container>
)

}