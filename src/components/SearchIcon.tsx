"use client";

import { useRouter } from "next/navigation";

export default function SearchIcon() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/search-page")}
      className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
      aria-label="Search"
    >
      <svg
        className="h-5 w-5 text-gray-600 hover:text-blue-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </button>
  );
}