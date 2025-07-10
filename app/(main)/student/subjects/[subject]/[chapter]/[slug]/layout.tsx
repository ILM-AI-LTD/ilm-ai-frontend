import Navbar from "@/feature/students/chapters-stream/components/Navbar";

export default function StreamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen w-full  bg-background overflow-hidden">
      <Navbar />

      <main className="flex-1 flex flex-col items-center overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
