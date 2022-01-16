let initialState = {
category:[]
}

 const categoryReducer = (state = initialState, action) => {
  const { category } = state;

  switch (action.type) {

  case "AddCategory":
   {

   category.push(action.payload)
console.log(category)
    return {...state,
category
    }
    }
   case "RemoveCategory":
    {
     let copy = category;
     copy.splice(copy.indexOf(action.payload), 1);
     return {
      ...state,
    category: copy
     }

    }
case "ClearCategories":
    {

     return {
      ...state,
    category: []
     }

    }
  default:
  return state

 }
 }

export {categoryReducer}