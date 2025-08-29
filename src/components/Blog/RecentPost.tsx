"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface Post {
  slug: string;
  title: string;
  date?: string;
  excerpt?: string;
}

interface RecentPostsProps {
  posts: Post[];
  currentSlug?: string;
}

export default function RecentPosts({ posts, currentSlug }: RecentPostsProps) {
  const filteredPosts = posts.filter(post => post.slug !== currentSlug).slice(0, 8);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="group relative rounded-2xl overflow-hidden backdrop-blur-md bg-black/40 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 p-6 mb-6"
    >
      {/* Shining Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
      
      <div className="relative z-10">
        <div className="flex items-center mb-6">
          <div className="w-2 h-8 bg-gradient-to-b from-purple-400 to-blue-500 rounded-full mr-3"></div>
          <h3 className="text-lg font-bold text-white">Recent Posts</h3>
        </div>
        
        <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-white/50 scrollbar-track-transparent pr-2">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group/item"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="block p-4 rounded-xl hover:bg-white/20 transition-all duration-300 hover:shadow-md border border-transparent hover:border-white/40 group-hover/item:translate-x-1"
              >
                <h4
                  className="text-sm font-semibold text-white/90 group-hover/item:text-white mb-2 leading-snug line-clamp-2 transition-colors duration-300"
                  dangerouslySetInnerHTML={{ __html: post.title }}
                />
                {post.date && (
                  <p className="text-xs text-white/60 group-hover/item:text-white/80 transition-colors duration-300">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                )}
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.div>
  );
}