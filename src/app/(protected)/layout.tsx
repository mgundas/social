import { AuthLoader } from "@/components/ui/blocks/AuthLoader";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLoader>{children}</AuthLoader>;
}
