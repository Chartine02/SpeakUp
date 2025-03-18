import { createBrowserRouter } from "react-router-dom";
import Routes from ".";
import Login from "../pages/auth/Login";
import Layout from "../components/layout";
import Register from "../pages/auth/Register";
import Landing from "../pages/Landing";
import Testimonies from "../pages/Testimonies";
import Chat from "../pages/Chat";

const router = createBrowserRouter([
  {
    path: Routes.HOME,
    element: <Layout />,
    children: [
      { index: true, element: <Landing /> },
      { path: Routes.REGISTER, element: <Register /> },
      { path: Routes.LOGIN.ROOT, element: <Login /> },
      { path: Routes.LOGIN.LANDING, element: <Landing /> },
      { path: Routes.TESTIMONIES, element: <Testimonies /> },
      { path: Routes.CHAT, element: <Chat /> },
    ],
  },
]);

export default router;
