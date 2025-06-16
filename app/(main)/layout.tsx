// import { EB_Garamond } from 'next/font/google';

import { PaperProvider } from "@/context/PaperContext";

// const eBGaramondfont = EB_Garamond({
//   subsets: ['latin'],
//   weight: "700",

// })


export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    // <div className={`${eBGaramondfont.className} min-h-screen flex justify-center items-center bg-primary-bg-color`}>
    // <PaperProvider>
    <div className={`min-h-screen flex justify-center items-center bg-primary-bg-color`}>
      {children}
    </div>
    // </PaperProvider>

  );
}
