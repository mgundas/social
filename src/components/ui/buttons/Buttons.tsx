import React from "react";

type buttonProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset" | undefined;
  children: React.ReactNode;
  color?: "black" | "pink" | "blue";
  className?: string;
};

const colors = {
  pink: "bg-pink-800 text-white hover:bg-pink-700 dark:hover:bg-pink/15 focus:ring-pink-500/50",
  blue: "bg-indigo-800 text-white hover:bg-indigo-700 dark:hover:bg-indigo/15 focus:ring-indigo-500/50",
  black: "hover:bg-black/15 dark:hover:bg-white/15 focus:ring-pink-500/50",
};
type ColorKey = keyof typeof colors;

export const Button = ({
  onClick,
  type,
  children,
  className,
  color = "black",
}: buttonProps) => {
  const safeColor = color as ColorKey;
  return (
    <button
      className={`px-4 py-2 w-full transition-all rounded-sm focus:ring-3 ${colors[safeColor]} ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export const MenuButton = ({
  onClick,
  color = "black",
  children,
}: buttonProps) => {
  const safeColor = color as ColorKey;

  return (
    <button
      className="px-4 h-full flex items-center justify-center cursor-pointer dark:hover:bg-white/15 hover:bg-black/15 transition-all"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
