import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Navbar from "./Navbar";
// import LoggedInBanner from "./LoggedInBanner";
// import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div>
      <div className="text-black font-poppins">
        <Navbar/>
        {/* <Sidebar/> */}
        {/* <LoggedInBanner /> */}
        <Outlet />
        <Footer />
      </div> 
    </div>
  );
};

export default Layout;
