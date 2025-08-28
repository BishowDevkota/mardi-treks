"use client";

import { Post } from "@/lib/wordpress";
import GlassCard from "./GlassCard";

interface BlogListProps {
  initialPosts: Post[];
}

export default function BlogList({ initialPosts }: BlogListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {initialPosts.length === 0 ? (
        <p className="text-gray-500 text-lg text-center col-span-full">
          No blog posts found.
        </p>
      ) : (
        initialPosts.map((post, index) => (
          <GlassCard
            key={post.id || index}
            title={post.title}
            image={post.featuredImage}
            description={post.excerpt}
            ctaLabel="Read More"
            ctaLink={`/blog/${post.slug}`}
          />
        ))
      )}
    </div>
  );
}
