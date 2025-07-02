import ThemeToggleButton from "@/components/customized/button/button-16";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-background">
      <div className="absolute h-full w-full bg-[radial-gradient(#40454c_0.5px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_5%,transparent_100%)]"></div>

      <ThemeToggleButton className="absolute top-5 right-5 z-50" />


      <div className="relative z-10 min-h-screen w-full inline-flex justify-center items-center p-7">
        {children}
      </div>

    </div>
  );
}
