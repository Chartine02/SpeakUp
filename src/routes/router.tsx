import { createBrowserRouter } from "react-router";
import Routes from ".";
import Login from "../pages/auth/Login";
import Layout from "../components/layout";
import Register from "../pages/auth/Register";
import Landing from "../pages/Landing";

const router = createBrowserRouter([
  {
    path: Routes.HOME,
    element: <Layout />,
    children: [
      { path: Routes.REGISTER, element: <Register /> },
      { path: Routes.LOGIN.ROOT, element: <Login /> },
      { path: Routes.LOGIN.LANDING, element: <Landing /> },
    ],
  },
]);

export default router;
