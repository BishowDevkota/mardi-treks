"use client";

import { useEffect, useState } from "react";
import { getPostBySlug, Post } from "@/lib/wordpress";
import { motion } from "framer-motion";

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
        const extracted = matches.map((m, i) => ({
          id: `heading-${i}`,
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
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="
        group relative
        w-64 max-h-[80vh]
        bg-black/40 backdrop-blur-md
        border border-white/10 rounded-2xl
        shadow-2xl
        p-6 flex flex-col
        sticky top-4
        z-50
        overflow-y-auto
        custom-scrollbar
        transition-all duration-500 transform
        hover:scale-105 hover:shadow-3xl
      "
    >
      {/* Shimmer Overlay for the whole sidebar */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-2xl translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>

      <h2 className="text-2xl font-bold text-white/90 mb-4 font-serif tracking-tight relative z-10">
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
              className="relative z-10"
            >
              <a
                href={`#${heading.id}`}
                className="
                  block px-3 py-2 rounded-lg
                  text-sm text-gray-200
                  overflow-hidden
                  relative
                  transition-all duration-300
                  hover:text-white hover:scale-[1.02] hover:shadow-md
                "
              >
                {/* Contained shimmer overlay */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-800 ease-in-out pointer-events-none rounded-lg"></div>
                <span className="relative z-10">{heading.text}</span>
              </a>
            </motion.li>
          ))}
        </ul>
      )}
    </motion.aside>
  );
}
