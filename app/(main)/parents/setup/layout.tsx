import Navbar from "@/feature/parents/components/setup/navbar/Navbar";

export default function ParentsSetupLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-screen w-full  bg-background overflow-hidden">
            <Navbar />

            <main className="flex-1 flex flex-col items-center overflow-hidden px-6 md:px-10 2xl:px-[135px]">
                {children}
            </main>

        </div>
    );
}

