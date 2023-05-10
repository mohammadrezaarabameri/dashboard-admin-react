import Home from "./pages/home/Home";
import UserList from "./pages/users/UserList";
import Generate from "./pages/generate/Generate";
import Products from "./pages/products/Products";
import Login from "./pages/login/Login";
import Shop from "./pages/shop/shop";
import Warehouse from "./pages/warehouse/Warehouse";

let routes = [
  { path: "/", element: <Login /> },
  { path: "/Home", element: <Home /> },
  { path: "/products", element: <UserList /> },
  { path: "/generate", element: <Generate /> },
  { path: "/product", element: <Products /> },
  { path: "/shop", element: <Shop /> },
  {path: "/warehouse", element: <Warehouse />}
];

export default routes;
