import { useNavigate } from "react-router";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Wrapper from "./Wrapper";
import Routes from "../../routes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "../../schema";
import { MdEmail } from "react-icons/md";
import { FaLockOpen } from "react-icons/fa6";
import { users } from "../../data/users";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const handleLogin = (data: LoginFormData) => {
    setLoginError(null);
    
    const user = users.find(
      (user) => user.email === data.email && user.password === data.password
    );
    
    if (user) {
      const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
      
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", user.role);
      localStorage.setItem("userName", user.username );
      localStorage.setItem("userId", user.id.toString());
      localStorage.setItem("isLoggedIn", "true");
      
      if (user.role === "ADMIN") {
        navigate(Routes.ADMIN);
      } else {
        navigate(Routes.TESTIMONIES);
      }
    } else {
      setLoginError("Invalid email or password");
    }
  };

  const handleNavigationToCreateAccount = () => navigate(Routes.REGISTER);

  return (
    <Wrapper>
      <h3 className="tex-lg font-medium">Welcome Back!</h3>
      <h1 className="text-2xl font-bold">Please, Log In</h1>
      
      {loginError && (
        <p className="text-red-400 font-medium text-sm">{loginError}</p>
      )}
      
      <form onSubmit={handleSubmit(handleLogin)} className="space-y-3">
        <Input
          placeholder="johndoe@gmail.com"
          src="user-alt.svg"
          register={register("email")}
          errorMessage={errors.email?.message}
        > 
        <MdEmail />
        </Input>
        <Input
          placeholder="password..."
          type="password"
          src="lock-open.svg"
          register={register("password")}
          errorMessage={errors.password?.message}
        >
          <FaLockOpen />
        </Input>
        <Button value="Login" type="submit" />
      </form>
      <div className="flex justify-center">
        <div className="flex gap-2 w-1/2 items-center">
          <span className="h-0.5 bg-white w-full"></span>
          <p>or</p>
          <span className="h-0.5 bg-white w-full"></span>
        </div>
      </div>
      <Button
        value="Create an account"
        onClick={handleNavigationToCreateAccount}
        option={true}
      />
    </Wrapper>
  );
};

export default Login;
