export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="min-h-screen flex justify-center items-center p-5 bg-primary-bg-color">
        {children}
      </div>
    );
  }
  