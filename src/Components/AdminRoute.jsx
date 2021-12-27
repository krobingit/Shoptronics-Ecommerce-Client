import { useSelector } from "react-redux";
import { Route } from 'react-router-dom';
import { Home } from "../Pages/Home";

export const AdminRoute = ({ path, component }) => {

 const { currentUser } = useSelector(state => state.user);

 return (
  <Route path={path}
   render={() =>
     currentUser.isAdmin ? <>{component}</> : <Home />
   }>
  </Route>
)


}
