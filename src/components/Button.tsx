import clsx from "clsx";
import { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  icon?: string;
  option?: boolean;
  small?: boolean
}

const Button = ({ onClick, value, icon, option = false, small }: ButtonProps) => {
  return (
    <button
      className={clsx("bg-secondary/60 text-white hover:cursor-pointer font-medium py-2 rounded-full", {
        "bg-gray-300": option == true,
        "w-1/2 rounded-xl px-3": small == true
      })}
      onClick={onClick}
    >
      {value}
      {icon}
    </button>
  );
};

export default Button;
