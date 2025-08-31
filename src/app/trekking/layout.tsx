"use client";

import "@/app/globals.css";
import SubHero from "@/components/SubHeroComponent";
import TrekkingSidebar from "@/components/Trekking/TrekkingLeftSideBar";
import { Suspense } from "react";
import { TrekkingProvider, useTrekkingContext } from "./TrekkingContext";
import TrekkingRightSideBar from "@/components/Trekking/TrekkingRightSideBar";

function TrekkingLayoutContent({ children }: { children: React.ReactNode }) {
  const { siteTitle, backgroundImage } = useTrekkingContext();

  return (
    <>
      <SubHero siteTitle={siteTitle} backgroundImage={backgroundImage} />
      <Suspense
        fallback={
          <div className="container mx-auto px-0 py-4 text-center text-gray-300">
            Loading content...
          </div>
        }
      >
        <main className="container mx-auto flex flex-col lg:flex-row gap-6 px-4 lg:px-0 py-6">
          <aside className="lg:block w-full lg:w-1/5">
            <TrekkingSidebar />
          </aside>
          <div className="w-full lg:w-3/5 relative overflow-hidden group">
            <div className="  absolute inset-0 bg-black/50 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]"></div>
            <div className="  absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>
            <div className="  relative z-10">{children}</div>
          </div>
          <aside className="lg:block w-full lg:w-1/5">
            <TrekkingRightSideBar />
          </aside>
        </main>
      </Suspense>
    </>
  );
}

export default function TrekkingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TrekkingProvider>
      <TrekkingLayoutContent>{children}</TrekkingLayoutContent>
    </TrekkingProvider>
  );
}
