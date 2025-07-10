import Navbar from "@/feature/landing/components/navbar/Navbar";
import { Bubblegum_Sans, Khand } from "next/font/google";

const bubbleGum = Bubblegum_Sans({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bubbleGum",
});

const khand = Khand({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-khand",
});

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`min-h-screen w-full  bg-background ${bubbleGum.variable} ${khand.variable}`}
    >
      <Navbar />
      {children}
    </div>
  );
}
