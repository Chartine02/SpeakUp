import { ComponentProps } from "react";

type InputProps = ComponentProps<"input">;

const Input = ({ placeholder, src, name, type }: InputProps) => {
  return (
    <div className="bg-white focus:outline-none gap-2 text-gray-600 placeholder:text-gray-300  py-2 flex px-3 items-center rounded-full">
      <img src={src} />
      <input
        className="focus:outline-none"
        placeholder={placeholder}
        name={name}
        type={type}
      />
    </div>
  );
};

export default Input;
