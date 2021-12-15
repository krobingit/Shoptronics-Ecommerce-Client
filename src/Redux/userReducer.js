let initialState = {
 currentUser: null,
 pendingLogin: false,
  error: false,
}

 const userReducer = (state = initialState, action) => {

 switch (action.type) {
  case "loginInitiate":
   {

    return {
     ...state,
     error:false,
     pendingLogin: true
    }

   }
  case "loginOK":
   {
    return {

     ...state,
     pendingLogin: false,
     currentUser: action.payload,
     error: false
    }


   }
  case "loginFail":
{
    return {
     ...state,
     pendingLogin: false,
     error: true,
      currentUser: null,
    }
   }
     case "logOut":
{
    return {
     ...state,
     pendingLogin: false,
     error: false,
     currentUser:null

    }
   }
  default:
  return state

 }
 }

export {userReducer}