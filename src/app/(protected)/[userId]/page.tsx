"use client";

import { useAuth } from "@/context/AuthContext";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/buttons/Buttons";
import { FormInput } from "@/components/ui/inputs/Inputs";

type Profile = {
  firstName: string;
  lastName: string;
  email?: string;
};

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const userIdFromURL = params.userId as string;

  const [profile, setProfile] = useState<Profile | null>(null);
  const [form, setForm] = useState<Profile>({ firstName: "", lastName: "", email: "" });
  const [message, setMessage] = useState("");
  const isOwner = user?.id === userIdFromURL;

  useEffect(() => {
    const loadProfile = async () => {
      const res = await fetch(`/api/profile?userId=${userIdFromURL}`);
      const data = await res.json();
      setProfile(data);
      if (isOwner) setForm(data);
    };
    loadProfile();
  }, [userIdFromURL, isOwner]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) setMessage("Profile updated!");
    else setMessage("Update failed.");
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">
        {isOwner ? "Edit Your Profile" : `${profile.firstName} ${profile.lastName}`}
      </h1>

      {isOwner ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FormInput
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            placeholder="First name"
          />
          <FormInput
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            placeholder="Last name"
          />
          <Button type="submit">Save Changes</Button>
          {message && <p className="text-green-500">{message}</p>}
        </form>
      ) : (
        <div className="p-4 rounded bg-gray-950 shadow">
          <p>
            <strong>First Name:</strong> {profile.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {profile.lastName}
          </p>
          {profile.email && (
            <p>
              <strong>Email:</strong> {profile.email}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
