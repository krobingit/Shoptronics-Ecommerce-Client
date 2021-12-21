let initialState = {
 wishlistproducts: [],
}

export const wishlistReducer = (state = initialState, action) => {
 const { wishlistproducts} = state;
 switch (action.type)
 {
   case "WishListAddItem":
     {
       wishlistproducts.push(action.payload);
       return {
         ...state,
       }
     }

   case "WishListRemoveItem":
     {
       let copyOfProd = [...wishlistproducts];
       copyOfProd.splice(action.index,1)
       return {
         ...state,
         wishlistproducts: [...copyOfProd],
       }


     }
       case "EmptyWishList":
     {
       return {
         wishlistproducts: [],
       }


     }
default: return state;


 }




}