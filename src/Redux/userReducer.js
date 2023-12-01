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
    localStorage.setItem("uid",action.payload._id)
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
    case "updateToken":
      {
       return {
        ...state,
        currentUser:{...state.currentUser,token:action.payload.refreshToken}
       }
   }
  default:
  return state

 }
 }

export {userReducer}