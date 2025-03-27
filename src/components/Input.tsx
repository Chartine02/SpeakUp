import { ComponentProps, PropsWithChildren, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

interface InputProps extends ComponentProps<"input"> {
  register: UseFormRegisterReturn;
  errorMessage?: string;
}

const Input = ({
  children,
  register,
  errorMessage,
  ...delegatedProperties
}: PropsWithChildren<InputProps>) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const isPasswordInput = delegatedProperties.type === "password";
  
  const PasswordToggle = () => (
    <div 
      onClick={() => setShowPassword(!showPassword)} 
      className="cursor-pointer"
    >
      {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
    </div>
  );

  return (
    <div className="text-start">
      <div className="bg-white focus:outline-none gap-4 text-gray-600 placeholder:text-gray-300 py-2 flex px-3 items-center rounded-xl">
        {children}
        <input
          {...register}
          {...delegatedProperties}
          type={isPasswordInput ? (showPassword ? "text" : "password") : delegatedProperties.type}
          className="focus:outline-none w-2/4 flex-1"
        />
        {isPasswordInput && <PasswordToggle />}
      </div>
      {errorMessage && (
        <p className="text-xs px-3 text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
