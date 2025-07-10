"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/buttons/Buttons";
import { FormInput } from "@/components/ui/inputs/Inputs";
import Notification from "@/components/ui/forms/Notification";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, loading, user } = useAuth();

  const verified = searchParams.get("verified");

  useEffect(() => {
    if (!loading && user) router.push("/dashboard");
  }, [user, loading]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await login(email, password)
      .then(() => {
        setMessage("Login successful! Redirecting...");
      })
      .catch((err) => {
        setMessage(err.message || "Login failed. Please try again.");
      });
  }

  return (
    <>
      <h1 className="text-2xl mb-4">Welcome Back!</h1>
      <p>{message}</p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 w-full sm:w-2/3"
      >
        {verified && (
          <Notification type="success">
            Email verified! You can now log in.
          </Notification>
        )}
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
          Sign In
        </Button>
      </form>
      <hr className=" dark:text-white/20 text-black/20 w-2/3 my-4" />
      <h2 className="text-xl mb-4">New to PostPulse?</h2>
      <Button
        onClick={(e) => router.push("/signup")}
        className="sm:w-2/3 w-full"
        color="blue"
        type="submit"
      >
        Register Here
      </Button>
    </>
  );
}
