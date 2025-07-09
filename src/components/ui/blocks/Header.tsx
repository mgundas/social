"use client";
import React from "react";
import { useTheme } from "@/context/themeContext";
import { MenuButton } from "@/components/ui/buttons/Buttons";
import { useRouter } from "next/navigation";

const Header = () => {
  const { toggleTheme, theme } = useTheme();
  const router = useRouter();
  return (
    <nav className="h-16 flex items-center justify-between">
      <div className="px-4">PostPulse</div>
      <div className="flex h-full gap-2 items-center justify-center">
        <MenuButton onClick={(e) => {router.push("/signup");}}>Sign Up</MenuButton>
        <MenuButton onClick={(e) => {router.push("/login");}}>Login</MenuButton>
        <MenuButton onClick={toggleTheme}>
          {theme.toLocaleUpperCase()}
        </MenuButton>
      </div>
    </nav>
  );
};

export default Header;