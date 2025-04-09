export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex justify-center items-center p-5">
      {children}
    </div>
  );
}
