import Navbar from "@/feature/landing/components/navbar/Navbar";

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-primary-bg-color">
      <Navbar />
      {children}
    </div>
  );
}
