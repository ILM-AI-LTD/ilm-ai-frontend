import Navbar from "@/feature/landing/components/navbar/Navbar";
import { Bubblegum_Sans } from "next/font/google";

const bubbleGum = Bubblegum_Sans({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bubbleGum",
});

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`min-h-screen w-full  bg-background ${bubbleGum.variable}`}>
      <Navbar />
      {children}
    </div>
  );
}
