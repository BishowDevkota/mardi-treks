// src/app/layout.tsx
import "@/app/globals.css";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/Home-page/ScrollToTop";
import WhatsAppButton from "@/components/Home-page/Whatshapp";
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
        {/* <TrekkingSidebar/> */}
        <main className="container mx-0 px-0 py-0">{children}</main>
        <ScrollToTop />
        <WhatsAppButton phoneNumber="+977 9864379436" />
        <Footer />
      </body>
    </html>
  );
}
