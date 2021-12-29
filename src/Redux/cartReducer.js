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
         total: total + (Math.round(action.payload.price) * action.payload.quantity)
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
   case "AddQuantity":
     {
       products[action.index].quantity += 1;
       return {
         ...state,
total:Math.round(
            products.reduce((result, cartItem) => result + cartItem.price*(cartItem.quantity), 0))
       }
     }
   case "RemoveQuantity":
     {
       if (products[action.index].quantity > 1)
         products[action.index].quantity -= 1;
         return {
           ...state,
           total: Math.round(
             products.reduce((result, cartItem) => result + cartItem.price * (cartItem.quantity), 0))
         }

     }

   case "RemoveItem":
     {
       let filteredProducts= [...products];
       filteredProducts.splice(action.index,1)
       //const filteredProducts=products.filter((product)=>product._id!==action.payload._id)
       return {
         ...state,
         products: [...filteredProducts],
         quantity: quantity - 1,
         total:(total-(Math.round(action.payload.price)*action.payload.quantity))

       }


     }
default: return state;


 }




}