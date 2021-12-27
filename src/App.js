import "./App.css";
import { Login } from "./Pages/Login";
import { Route, Switch } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Register } from "./Pages/Register";
import { ForgotPassword } from "./Pages/ForgotPassword";
import { ResetPassword } from "./Pages/ResetPassword";
import { ProductList } from "./Pages/ProductList";
import { ProductToCart } from "./Pages/ProductToCart";
import { Cart } from "./Pages/Cart";
import { WishList } from "./Pages/WishList";
import { OrderPlaced } from "./Pages/OrderPlaced";
import { Orders } from "./Pages/Orders";
import { useSelector } from "react-redux";
import { AdminHome } from "./Admin Pages/AdminHome";
import { AdminRoute } from "./Components/AdminRoute";
import { AdminProductList } from "./Admin Pages/AdminProductList";

function App() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home />
          </Route>
          { /*Admin Routes*/}
          <AdminRoute exact path="/adminHome" component={<AdminHome/>}/>
          <AdminRoute exact path="/adminProductList" component={<AdminProductList/>}/>



            {/*Common Routes*/ }
        <Route path="/cart">
          <Cart />
        </Route>
             <Route path="/products">
          <ProductList />
        </Route>
        <Route path="/product/:id">
          <ProductToCart />
        </Route>
          <Route path="/orders">
            {currentUser ? <Orders /> : <Login />}
          </Route>

                 {/*User Routes */}
        <Route path="/forgotPassword">
          <ForgotPassword />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
 <Route path="/wishlist">
          <WishList />
        </Route>
         <Route path="/order-placed/:orderId">
          <OrderPlaced />
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
