import { FaAngleRight, FaLockOpen } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router";
import { RegiserFormData, registerSchema } from "../../schema";
import Routes from "../../routes";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Wrapper from "./Wrapper";
import { FaPhoneAlt } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegiserFormData>({ resolver: zodResolver(registerSchema) });

  const formatRegistrationData = (data: RegiserFormData) => ({
    email: data.email.toLowerCase().trim(),
    password: data.password,
    username: data.name.trim(),
    phone_number: data.phoneNumber.trim()
  });

  const onRegister = async (data: RegiserFormData) => {
    try {
      setError(null);
      setIsSubmitting(true);
      const formattedData = formatRegistrationData(data);
      
      const response = await fetch("https://speak-up-backend.onrender.com/auth/signup", {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formattedData)
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.message || "Registration failed");
      }
      
      setSuccess(true);
      setTimeout(() => navigate(Routes.LOGIN.ROOT), 2000);
      
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputFields = [
    {
      placeholder: "Names",
      register: register("name"),
      errorMessage: errors.name?.message,
      icon: <IoPerson />
    },
    {
      placeholder: "Email",
      register: register("email"),
      errorMessage: errors.email?.message,
      icon: <MdEmail />
    },
    {
      placeholder: "Phone number",
      register: register("phoneNumber"),
      errorMessage: errors.phoneNumber?.message,
      icon: <FaPhoneAlt />
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
          <span className="block sm:inline"> Your account has been created. Redirecting to login...</span>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div>
        <h3 className="tex-lg font-medium">Hey there!</h3>
        <h1 className="text-2xl font-bold">Let's get started</h1>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit(onRegister)} className="space-y-3">
        {inputFields.map((field, index) => (
          <Input
            key={index}
            {...field}
          >
            {field.icon}
          </Input>
        ))}
        <Button 
          className="w-full" 
          value={isSubmitting ? "Creating account..." : "Register"} 
          type="submit"
          disabled={isSubmitting}
        >
          <FaAngleRight />
        </Button>
      </form>

      <div className="flex gap-2 justify-center items-center">
        <span className="h-0.5 w-1/2 bg-white"></span>
        <p>or</p>
        <span className="h-0.5 w-1/2 bg-white"></span>
      </div>

      <Button 
        onClick={() => navigate(Routes.LOGIN.ROOT)} 
        value="Login" 
        option={true} 
      />
    </Wrapper>
  );
};

export default Register;
