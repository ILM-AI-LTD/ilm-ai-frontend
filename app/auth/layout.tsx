export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-primary-bg-color">
      <div className="absolute h-full w-full bg-[radial-gradient(#40454c_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="relative z-10 min-h-screen w-full inline-flex justify-center items-center p-7">
        {children}
      </div>

    </div>
  );
}
