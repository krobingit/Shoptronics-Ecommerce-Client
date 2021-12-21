import './App.css';
import { Login } from './Pages/Login';
import { Route, Switch } from 'react-router-dom';
import { Home } from './Pages/Home';
import { Register } from './Pages/Register';
import { ForgotPassword } from './Pages/ForgotPassword';
import { ResetPassword } from './Pages/ResetPassword';
import { ProductList } from './Pages/ProductList';
import { ProductToCart } from './Pages/ProductToCart';
import { Cart } from './Pages/Cart';
import { WishList } from './Pages/WishList';
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home />
    {/*User Routes */}
        </Route>
            <Route path="/cart">
          <Cart />
        </Route>
            <Route path="/wishlist">
          <WishList />
        </Route>
        <Route path="/forgotPassword">
          <ForgotPassword />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
            <Route path="/products">
          <ProductList />
        </Route>
           <Route path="/product/:id">
          <ProductToCart />
        </Route>
        <Route path="/resetPassword/:userid/:token">
          <ResetPassword />
        </Route>
        <Route path="/register">
          <Register />
        </Route>

      </Switch>
    </div>
  );
}

export default App;
