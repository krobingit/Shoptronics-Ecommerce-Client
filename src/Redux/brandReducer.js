let initialState = {
brand:[]
}

 const brandReducer = (state = initialState, action) => {
  const { brand } = state;

  switch (action.type) {

  case "AddBrand":
   {

     brand.push(action.payload)
     console.log(brand)
    return {...state,
brand
    }
    }
   case "RemoveBrand":
    {
     let copy = brand;
     copy.splice(copy.indexOf(action.payload), 1);
     return {
      ...state,
      brand: copy
     }

    }
case "ClearBrands":
    {

     return {
      ...state,
      brand: []
     }

    }
  default:
  return state

 }
 }

export {brandReducer}