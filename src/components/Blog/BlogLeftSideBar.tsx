"use client";

import { useEffect, useState } from "react";
import { getPostBySlug, Post } from "@/lib/wordpress";
import { motion } from "framer-motion";

// Helper function to create a URL-friendly slug from a string
const slugify = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

interface Heading {
  id: string;
  text: string;
}

export default function BlogLeftSideBar({ slug }: { slug: string }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const post: Post | null = await getPostBySlug(slug);
        if (!post || !post.content) {
          setError("No content available");
          return;
        }

        const regex = /<h2.*?>(.*?)<\/h2>/g;
        const matches = [...post.content.matchAll(regex)];
        const extracted = matches.map((m) => ({
          id: slugify(m[1]), // Use slugify to create a clean ID
          text: m[1].replace(/<\/?[^>]+(>|$)/g, ""),
        }));
        setHeadings(extracted);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error loading blog content"
        );
      }
    }

    fetchPost();
  }, [slug]);

  return (
    <motion.aside
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="
        group relative
        w-[90%] left-[10%] max-h-[80vh]
        bg-black/50 backdrop-blur-xl
        border border-gray-700/50 rounded-2xl
        shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]
        flex flex-col
        sticky top-[100px]
        z-10
        overflow-y-auto overflow-x-hidden
        custom-scrollbar
        transition-all duration-500
        hover:scale-105
      "
    >
      <div className="relative p-6">
        {/* Shimmer Overlay on container */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
        </div>

        <h2 className="text-3xl font-bold text-gray-200 mb-6 tracking-tight relative z-10">
          On This Page
        </h2>

        {error ? (
          <p className="text-gray-400 text-sm relative z-10">{error}</p>
        ) : (
          <ul className="flex-1 space-y-2 relative z-10">
            {headings.map((heading, index) => (
              <motion.li
                key={`${heading.id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                className="relative z-10 group/item"
              >
                <a
                  href={`#${heading.id}`}
                  className={`
                    block px-3 py-2 rounded-lg
                    text-sm text-gray-300
                    transition-all duration-300
                    overflow-hidden relative
                    hover:text-white hover:bg-gray-800/50 hover:shadow-lg
                  `}
                >
                  {/* Individual Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/item:translate-x-[100%] transition-transform duration-800 ease-in-out pointer-events-none"></div>

                  {/* Text and Zoom effect */}
                  <span className="relative z-10 block transition-transform duration-300 group-hover/item:scale-[1.03]">
                    {heading.text}
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </motion.aside>
  );
}