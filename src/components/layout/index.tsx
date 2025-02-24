import { Outlet } from "react-router";
// import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div>
      <div className="text-black">
        {/* <Sidebar/> */}
        <Outlet/>
      </div>
    </div>
  );
};

export default Layout;
