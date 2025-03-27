// import { ReactNode } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from "./Footer";
import Routes from '../routes';
import Navbar from './Navbar';

// interface LayoutProps {
//   children: ReactNode;
// }

const Layout = () => {
  const location = useLocation();
  
  const isAuthPage = 
    location.pathname === Routes.LOGIN.ROOT || 
    location.pathname === Routes.REGISTER;
  
  return (
    <div className="min-h-screen flex flex-col">
      {!isAuthPage && <Navbar />}
      <main className="flex-grow">
        <Outlet/>
        {/* {children} */}
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
};

export default Layout;
