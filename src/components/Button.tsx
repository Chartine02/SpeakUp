import clsx from "clsx";
import { ComponentProps, PropsWithChildren } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  option?: boolean;
  small?: boolean;
}

const Button = ({
  onClick,
  value,
  option = false,
  small,
  children,
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      className={clsx(
        "flex items-center w-full justify-center gap-1 py-3 px-4 bg-secondary/50 text-white hover:cursor-pointer font-medium rounded-full",
        {
          "bg-gray-300": option,
          "w-1/2 rounded-xl bg-secondary/40": small,
        }
      )}
      onClick={onClick}
    >
      {value}
      {children}
    </button>
  );
};

export default Button;
