import clsx from "clsx";
import { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  icon?: string;
  option?: boolean;
}

const Button = ({ onClick, value, icon, option = false }: ButtonProps) => {
  return (
    <button
      className={clsx("bg-primary text-white font-medium py-3 rounded-full", {
        "bg-gray-300": option == true,
      })}
      onClick={onClick}
    >
      {value}
      {icon}
    </button>
  );
};

export default Button;
