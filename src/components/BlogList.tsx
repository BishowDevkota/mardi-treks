"use client";

// import { useEffect } from "react";
import useSWR from "swr";
import { Post, getPosts } from "@/lib/wordpress";
import GlassCard from "./GlassCard";

// Fetcher function for SWR
const fetcher = async () => {
  const posts = await getPosts();
  return posts;
};

interface BlogListProps {
  initialPosts: Post[];
}

export default function BlogList({ initialPosts }: BlogListProps) {
  const { data: posts = initialPosts, isLoading } = useSWR("/api/posts", fetcher, {
    fallbackData: initialPosts, // Use server-side posts as fallback
    refreshInterval: 60000, // Poll every 60 seconds for updates
    dedupingInterval: 30000, // Avoid duplicate requests within 30 seconds
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {isLoading ? (
        <p className="text-gray-500 text-lg text-center col-span-full">Loading...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-500 text-lg text-center col-span-full">No blog posts found.</p>
      ) : (
        posts.map((post, index) => (
          <GlassCard key={post.id || index} title={post.title} image={post.featuredImage} description={post.excerpt} ctaLabel="Read More" ctaLink={`/blog/${post.slug}`}  />
        ))
      )}
    </div>
  );
}