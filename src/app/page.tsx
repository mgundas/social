"use client";
import { Button, MenuButton } from "@/components/ui/buttons/Buttons";
import Notification from "@/components/ui/forms/Notification";
import { FormInput } from "@/components/ui/inputs/Inputs";
import { useTheme } from "@/context/themeContext";

export default function Home() {
  const { toggleTheme, theme } = useTheme();
  return (
    <div className="h-screen flex flex-col">
      <nav className="h-16 flex items-center justify-between">
        <div className="px-4">PostPulse</div>
        <div className="flex h-full gap-2 items-center justify-center">
          <MenuButton>Test</MenuButton>
          <MenuButton>Test</MenuButton>
          <MenuButton onClick={toggleTheme}>
            {theme.toLocaleUpperCase()}
          </MenuButton>
        </div>
      </nav>
      <div className="grow overflow-auto flex flex-col sm:flex-row p-4">
        <div className="text-2xl my-2 sm:grow flex items-center justify-center">Welcome to PostPulse!</div>
        <div className="sm:grow flex flex-col items-center justify-center px-4">
          <div className="text-center text-xl my-4">Already a user?</div>
          <form action="" className="flex flex-col gap-2 w-full sm:w-2/3">
            <FormInput type="email" placeholder="Email" />
            <FormInput type="password" placeholder="Password" />
            <Button color="pink" type="submit">Sign In</Button>
            <Notification type="warning">Username or password is incorrect.</Notification>
          </form>
          <hr className=" dark:text-white/20 text-black/20 w-2/3 my-4" />
          <h2 className="text-xl mb-4">New to PostPulse?</h2>
          <Button className="sm:w-2/3 w-full" color="blue" type="submit">Register Here</Button>
        </div>
      </div>
      {/* <div className="h-8 flex items-center justify-center text-sm">
        {new Date().getFullYear()} - PostPulse
      </div> */}
    </div>
  );
}
