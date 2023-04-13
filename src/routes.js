import Home from "./pages/home/Home";
import UserList from "./pages/users/UserList";
import NewUser from "./pages/newUser/NewUser";
import Products from "./pages/products/Products";
import Login from "./pages/login/Login";

let routes = [
  { path: "/", element: <Login /> },
  { path: "/Home", element: <Home /> },
  { path: "/users", element: <UserList /> },
  { path: "/newUser", element: <NewUser /> },
  { path: "/products", element: <Products /> },
];

export default routes;
