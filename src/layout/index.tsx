import { Outlet, useLocation } from 'react-router-dom';
import Footer from "./Footer";
import Routes from '../routes';
import Navbar from './Navbar';


const Layout = () => {
  const location = useLocation();
  
  const isAuthPage = 
    location.pathname === Routes.LOGIN.ROOT || 
    location.pathname === Routes.REGISTER;
  
  return (
    <div className="min-h-screen flex flex-col">
      {!isAuthPage && <Navbar />}
      <main className="flex-grow pt-16">
        <Outlet/>
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
};

export default Layout;
