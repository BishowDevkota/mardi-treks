// src/app/layout.tsx
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";


export const metadata = {
  title: "My Hybrid Website",
  description: "Next.js + WordPress Blog",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        <main className="container mx-0 px-0 py-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
