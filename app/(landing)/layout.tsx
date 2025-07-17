import Navbar from "@/feature/landing/components/navbar/Navbar";
import { Bubblegum_Sans, Khand, Hanken_Grotesk } from "next/font/google";

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

const hkGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-hkGrotesk",
});

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`min-h-screen w-full  bg-background ${bubbleGum.variable} ${khand.variable} ${hkGrotesk.variable}`}
    >
      <Navbar />
      {children}
    </div>
  );
}
