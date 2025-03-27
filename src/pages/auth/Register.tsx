import { FaAngleRight, FaLockOpen } from "react-icons/fa6";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Wrapper from "./Wrapper";
import { useNavigate } from "react-router";
import Routes from "../../routes";
import { FaPhoneAlt } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegiserFormData, registerSchema } from "../../schema";
import axios from "axios";
// import { useState } from "react";
// import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegiserFormData>({ resolver: zodResolver(registerSchema) });

  const onRegister = async (data: RegiserFormData) => {
    try {
      const response = await axios.post<RegiserFormData>(
        "https://speak-up-backend.onrender.com/auth/signup",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // setIsLoggedIn(true);
      navigate(Routes.LOGIN.LANDING)
      console.log("registered");
      console.log(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
      }
      console.log("An expected error occured", error);
    }
  };

  const handleNavigatioToLogin = () => navigate(Routes.LOGIN.ROOT);

  return (
    <Wrapper>
      <div>
        <h3 className=" tex-lg font-medium">Hey there!</h3>
        <h1 className="text-2xl font-bold"> Let's get started</h1>
      </div>
      <form action="" onSubmit={handleSubmit(onRegister)} className="space-y-3">
        {/* <label htmlFor="name" className="self-start">Name</label> */}
        <Input
          placeholder="Names"
          register={register("name")}
          errorMessage={errors.name?.message}
        >
          <IoPerson />
        </Input>
        <Input
          placeholder="Email"
          register={register("email")}
          errorMessage={errors.email?.message}
        >
          <MdEmail />
        </Input>
        <Input
          placeholder="Phone number"
          register={register("phoneNumber")}
          errorMessage={errors.phoneNumber?.message}
        >
          <FaPhoneAlt />
        </Input>
        <Input
          placeholder="Password..."
          type="password"
          register={register("password")}
          errorMessage={errors.password?.message}
        >
          <FaLockOpen />
        </Input>
        <Button className="w-full" value="Register" type="submit">
          <FaAngleRight />
        </Button>
      </form>
      <div className="flex gap-2 justify-center items-center">
        <span className="h-0.5 w-1/2 bg-white "></span>
        <p>or</p>
        <span className="h-0.5 w-1/2 bg-white "></span>
      </div>
      <Button onClick={handleNavigatioToLogin} value="Login" option={true} />
    </Wrapper>
  );
};

export default Register;
