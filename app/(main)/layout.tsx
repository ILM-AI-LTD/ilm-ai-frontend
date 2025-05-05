export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-primary-bg-color">
        {children}
      </div>
    );
  }
  