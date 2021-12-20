let initialState = {
 products: [],
 total: 0,
 quantity:0
}

export const cartReducer = (state = initialState, action) => {
 const { products, total, quantity } = state;
 switch (action.type)
 {
   case "AddItem":
     {
       products.push(action.payload);
       return {
         ...state,
         quantity: quantity + 1,
         total: total + (Math.round(action.payload.price*76) * action.payload.quantity)
       }
     }
       case "EmptyCart":
     {

       return {
         ...state,
         quantity: 0,
         total: 0,
         products:[]
       }
     }

   case "RemoveItem":
     {
       let copyOfProd = [...products];
       copyOfProd.splice(action.index,1)
       return {
         ...state,
         products: [...copyOfProd],
         quantity: quantity - 1,
         total:(total-(Math.round(action.payload.price*76)*action.payload.quantity))

       }


     }
default: return state;


 }




}