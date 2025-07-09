"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/buttons/Buttons";
import { FormInput } from "@/components/ui/inputs/Inputs";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("Check your email to verify your account.");
    } else {
      setMessage(data.error || "Something went wrong.");
    }
  }

  return (
    <>
      <h1 className="text-2xl mb-4">Create an Account</h1>
      <p>{message}</p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 w-full sm:w-2/3"
      >
        <FormInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <FormInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <Button color="pink" type="submit">
          Sign Up
        </Button>
      </form>
      <hr className=" dark:text-white/20 text-black/20 w-2/3 my-4" />
      <h2 className="text-xl mb-4">Already a member of PostPulse?</h2>
      <Button
        onClick={(e) => router.push("/login")}
        className="sm:w-2/3 w-full"
        color="blue"
        type="submit"
      >
        Login
      </Button>
    </>
  );
}
