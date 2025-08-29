import { getPosts } from "@/lib/wordpress";
import BlogPageClient from "@/components/Blog/BlogPageClient";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  // Fetch all posts at runtime on server
  const allPosts = await getPosts();
  
  return (
    <BlogPageClient 
      allPosts={allPosts}
    />
  );
}