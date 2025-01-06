import { createBrowserRouter } from "react-router-dom";
import Cart from "../page/Cart/Cart";
import Dashboard from "../page/Dashboard/Dasbboard";
import Login from "../page/Login/Login";
import Products from "../page/Products/Products";
import Layout from "./Layout";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/products",
        element: (
          <PrivateRoute allowedRoles={["user", "moderator"]}>
            <Products />
          </PrivateRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <PrivateRoute allowedRoles={["user", "moderator"]}>
            <Cart />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
