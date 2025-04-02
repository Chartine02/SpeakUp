import { NavLink, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Routes from "../routes";
import { useUser } from "../context/UserContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const navLinks = [
    { value: "Home", link: Routes.HOME },
    { value: "About us", link: Routes.ABOUT },
    { value: "Articles", link: Routes.ARTICLES },
    ...(user ? [
      { value: "Testimonials", link: Routes.TESTIMONIES },
      { value: "Chat", link: Routes.CHAT },
      ...(user.role === "ADMIN" ? [
        { value: "Admin Dashboard", link: Routes.ADMIN }
      ] : [])
    ] : [])
  ];

  const handleRegister = () => navigate(Routes.REGISTER);
  const handleHomeNavigation = () => navigate(Routes.HOME);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate(Routes.HOME);
  };

  return (
    <nav className="bg-primary fixed z-50 w-full items-center flex justify-between px-20">
      <img 
        src="logo.svg" 
        alt="" 
        className="w-24 cursor-pointer" 
        onClick={handleHomeNavigation} 
      />
      <div className="flex items-center gap-6">
        <div className="flex whitespace-nowrap gap-4 text-white">
          {navLinks.map((navLink) => (
            <NavLink 
              key={navLink.value} 
              to={navLink.link}
              className={({ isActive }) => 
                isActive ? "text-secondary" : "hover:text-secondary/80"
              }
            >
              {navLink.value}
            </NavLink>
          ))}
        </div>
        
        {user ? (
          <div className="flex items-center gap-4">
            <Button 
              onClick={handleLogout} 
              small 
              value="Logout" 
            />
          </div>
        ) : (
          <Button 
            onClick={handleRegister} 
            small 
            value="Register" 
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
