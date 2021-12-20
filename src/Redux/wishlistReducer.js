let initialState = {
 products: [],
}

export const wishlistReducer = (state = initialState, action) => {
 const { products} = state;
 switch (action.type)
 {
   case "WishListAddItem":
     {
       products.push(action.payload);
       return {
         ...state,
       }
     }

   case "WishListRemoveItem":
     {
       let copyOfProd = [...products];
       copyOfProd.splice(action.index,1)
       return {
         ...state,
         products: [...copyOfProd],
       }


     }
default: return state;


 }




}