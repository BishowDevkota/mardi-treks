"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import GlassCard from "../GlassCard";
import { Post, getPosts } from "@/lib/wordpress";

export default function RecentBlogs() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecentPosts() {
      try {
        const fetchedPosts = await getPosts();
        const latestPosts = fetchedPosts.slice(0, 3);
        setPosts(latestPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRecentPosts();
  }, []);

  return (
    <section className="py-20 px-8 md:px-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-20 w-80 h-80 bg-teal-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-violet-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-amber-300 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-serif tracking-tight drop-shadow-md">
            Recent Blogs
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Explore our latest stories and insights from the Mardi Himal Trek and beyond, crafted to inspire your next adventure.
          </p>
        </motion.div>

        {/* Blog Cards Grid */}
        {loading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <GlassCard
                  title={post.title.replace(/&amp;/g, "&")}
                  description={
                    <span
                      className="line-clamp-4"
                      dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />
                  }
                  image={post.featuredImage || "/images/placeholder-blog.jpg"}
                  ctaLabel="Read More"
                  ctaLink={`/blog/${post.slug}`}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}