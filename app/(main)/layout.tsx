import 'katex/dist/katex.min.css';
import { ThemeProvider } from "next-themes";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      <div className={`min-h-screen flex justify-center items-center bg-background`}>
        {children}
      </div>
    </ThemeProvider>
  );
}
