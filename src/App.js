import './App.css';
import { Login } from './Pages/Login';
import { Route, Switch } from 'react-router-dom';
import { Home } from './Pages/Home';
import { Register } from './Pages/Register';
import { ForgotPassword } from './Pages/ForgotPassword';
import { ResetPassword } from './Pages/ResetPassword';
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/forgotPassword">
          <ForgotPassword />
        </Route>
        <Route path="/login">
          <Login />
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
