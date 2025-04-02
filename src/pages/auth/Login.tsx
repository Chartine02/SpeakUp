import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaLockOpen } from "react-icons/fa6";
import { LoginFormData, loginSchema } from "../../schema";
import Routes from "../../routes";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Wrapper from "./Wrapper";
import { useUser } from '../../context/UserContext';

const Login = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser, setIsLoading } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const formatLoginData = (data: LoginFormData) => ({
    email: data.email.toLowerCase().trim(),
    password: data.password
  });

  const fetchUserData = async (userId: number) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://speak-up-backend.onrender.com/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData = await response.json();
      setUser(userData);
      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };

  const onLogin = async (data: LoginFormData) => {
    try {
      setError(null);
      setIsLoading(true);
      const formattedData = formatLoginData(data);
      
      const response = await fetch("https://speak-up-backend.onrender.com/auth/signin", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formattedData)
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.message || "Login failed");
      }

      localStorage.setItem("token", responseData.token);
      localStorage.setItem("userId", responseData.id);

      const userData = await fetchUserData(responseData.id);
      
      setSuccess(true);
      
      setTimeout(() => {
        if (userData.role === "ADMIN") {
          navigate(Routes.ADMIN);
        } else {
          navigate(Routes.TESTIMONIES);
        }
      }, 1000);
      
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const inputFields = [
    {
      placeholder: "Email",
      register: register("email"),
      errorMessage: errors.email?.message,
      icon: <MdEmail />
    },
    {
      placeholder: "Password...",
      type: "password",
      register: register("password"),
      errorMessage: errors.password?.message,
      icon: <FaLockOpen />
    }
  ];

  if (success) {
    return (
      <Wrapper>
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> Login successful. Redirecting...</span>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h3 className="tex-lg font-medium">Welcome Back!</h3>
      <h1 className="text-2xl font-bold">Please, Log In</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit(onLogin)} className="space-y-3">
        {inputFields.map((field, index) => (
          <Input
            key={index}
            {...field}
          >
            {field.icon}
          </Input>
        ))}
        <Button className="w-full" value="Login" type="submit" />
      </form>

      <div className="flex gap-2 justify-center items-center">
        <span className="h-0.5 w-1/2 bg-white"></span>
        <p>or</p>
        <span className="h-0.5 w-1/2 bg-white"></span>
      </div>

      <Button 
        onClick={() => navigate(Routes.REGISTER)} 
        value="Create an account" 
        option={true} 
      />
    </Wrapper>
  );
};

export default Login;
