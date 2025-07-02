import Navbar from "@/feature/landing/components/navbar/Navbar";

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full  bg-background">
      <Navbar />
      {children}
    </div>
  );
}
