"use client";
import { Button } from "@/components/ui/buttons/Buttons";
import { useAuth } from "@/context/AuthContext";
import React from "react";

const Page = () => {
  const { user, logout } = useAuth();
  return (
    <div>
      {user?.id}
      <Button onClick={async (e) => await logout()}>Log out</Button>
    </div>
  );
};

export default Page;
