import Header from "@/components/ui/blocks/Header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="grow overflow-auto flex flex-col sm:flex-row p-4 gap-4">
        <div className="text-2xl my-2 sm:grow flex items-center justify-center">
          Welcome to PostPulse!
        </div>
        <div className="sm:grow flex flex-col items-center justify-center px-4">
          {children}
        </div>
      </div>
    </div>
  );
}
