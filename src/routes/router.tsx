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
import About from "../pages/About";
import Articles from "../pages/Articles";

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
      { path: Routes.LANDING, element: <Landing /> },
      { path: Routes.TESTIMONIES, element: <Testimonies /> },
      { path: Routes.CHAT, element: <Chat /> },
      { path: Routes.ADMIN, element: <AdminDashboard /> },
      { path: Routes.PROFESSIONALS, element: <Professionals /> },
      { path: Routes.ABOUT, element: <About /> },
      { path: Routes.ARTICLES, element: <Articles /> },
    ],
  },
]);

export default router;
