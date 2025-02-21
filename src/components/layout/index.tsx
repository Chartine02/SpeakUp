import { Outlet } from "react-router";
// import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div>
      <div className="">
        {/* <Sidebar/> */}
        <Outlet/>
      </div>
    </div>
  );
};

export default Layout;
