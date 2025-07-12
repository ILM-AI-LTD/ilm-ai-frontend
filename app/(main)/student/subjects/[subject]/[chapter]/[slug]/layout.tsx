import Navbar from "@/feature/students/chapters-stream/components/Navbar";

export default function StreamLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen w-full bg-background flex flex-col">
            <Navbar />
            <main className="flex-1 flex">
                <div className="pt-24 px-10 w-full">
                    {children}
                </div>
            </main>
        </div>
    );
}