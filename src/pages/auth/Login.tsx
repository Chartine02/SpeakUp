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

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const handleLogin = (data: LoginFormData) => {
    console.log(data);
    sessionStorage.setItem("isLoggedIn", "true");
    navigate(Routes.TESTIMONIES);
  };

  const handleNavigationToCreateAccount = () => navigate(Routes.REGISTER);

  return (
    <Wrapper>
      <h3 className=" tex-lg font-medium">Welcome Back!</h3>
      <h1 className="text-2xl font-bold">Please, Log In</h1>
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
        <div className="flex gap-2 w-1/2  items-center">
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
