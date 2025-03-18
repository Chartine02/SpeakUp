import { Outlet } from "react-router";
import Footer from "../Footer";
// import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div>
      <div className="text-black font-poppins">
        {/* <Sidebar/> */}
        <Outlet />
        <Footer />
      </div> 
    </div>
  );
};

export default Layout;
