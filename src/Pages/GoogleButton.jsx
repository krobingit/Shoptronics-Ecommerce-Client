import "./GoogleButton.css"

const GoogleSignInButton=(props)=>{
    return (
    <div class='g-sign-in-button' {...props}>
    <div class='content-wrapper'>
    <div class='logo-wrapper'>  
      <img src='https://developers.google.com/identity/images/g-logo.png' alt="google" />
      </div>  
      <span class='text-container'> 
        <span>Sign in with Google</span>
      </span>
    </div>  
  </div>)
}

export default GoogleSignInButton;