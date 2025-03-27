import { createBrowserRouter } from "react-router-dom";
import Routes from ".";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Landing from "../pages/Landing";
import Testimonies from "../pages/Testimonies";
import Chat from "../pages/Chat";
import AdminDashboard from "../pages/AdminDashboard";
import Professionals from "../pages/Professionals";
import Layout from "../layout";

const router = createBrowserRouter([
  {
    path: Routes.LOGIN.ROOT,
    element: <Login />
  },
  {
    path: Routes.REGISTER,
    element: <Register />
  },
  {
    path: Routes.HOME,
    element: <Layout />,
    children: [
      { index: true, element: <Landing /> },
      // { path: Routes.REGISTER, element: <Register /> },
      // { path: Routes.LOGIN.ROOT, element: <Login /> },
      { path: Routes.LOGIN.LANDING, element: <Landing /> },
      { path: Routes.TESTIMONIES, element: <Testimonies /> },
      { path: Routes.CHAT, element: <Chat /> },
      { path: Routes.ADMIN, element: <AdminDashboard /> },
      { path: Routes.PROFESSIONALS, element: <Professionals /> },
    ],
  },
]);

export default router;
