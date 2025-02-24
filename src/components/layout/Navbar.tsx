import { NavLink, useNavigate } from "react-router";
import Routes from "../../routes";
import Button from "../Button";

const Navbar = () => {
  const navigate = useNavigate()
  const navLinks = [
    { value: "Home", link: Routes.HOME },
    { value: "About us", link: Routes.HOME },
    { value: "Blogs", link: Routes.HOME },
    { value: "Testimonials", link: Routes.HOME },
    { value: "Features", link: Routes.HOME },
  ];

  const handleRegister = () => navigate(Routes.REGISTER)

  return (
    <nav className="bg-primary items-center flex justify-between px-20">
      <img src="logo.svg" alt="" className="w-24 " />
      <div className="flex items-center gap-6">
        <div className="flex whitespace-nowrap gap-4 text-white">
          {navLinks.map((navLink) => (
            <NavLink to={navLink.link}>{navLink.value}</NavLink>
          ))}
        </div>
        <Button onClick={handleRegister} small value={"Register"} />
      </div>
    </nav>
  );
};

export default Navbar;
