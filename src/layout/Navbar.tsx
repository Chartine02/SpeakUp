import { NavLink, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Routes from "../routes";

const Navbar = () => {
  const navigate = useNavigate()
  const navLinks = [
    { value: "Home", link: Routes.HOME },
    { value: "About us", link: Routes.ABOUT },
    { value: "Articles", link: Routes.ARTICLES },
    { value: "Testimonials", link: Routes.TESTIMONIES },
    { value: "Chat", link: Routes.CHAT },
  ];

  const handleRegister = () => navigate(Routes.REGISTER)
  const handleHomeNavigation = () => navigate(Routes.HOME)

  return (
    <nav className="bg-primary fixed z-50 w-full items-center flex justify-between px-20">
      <img src="logo.svg" alt="" className="w-24 cursor-pointer" onClick={handleHomeNavigation} />
      <div className="flex items-center gap-6">
        <div className="flex whitespace-nowrap gap-4 text-white">
          {navLinks.map((navLink) => (
            <NavLink key={navLink.value} to={navLink.link}>{navLink.value}</NavLink>
          ))}
        </div>
        <Button onClick={handleRegister} small value={"Register"} />
      </div>
    </nav>
  );
};

export default Navbar;
