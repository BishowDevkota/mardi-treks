import { getPostBySlug } from "@/lib/wordpress";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // Await params to access slug
  let post = null;
  let error: string | null = null;

  try {
    post = await getPostBySlug(slug); // Fetch post data
    if (!post) {
      error = `No post found for slug: ${slug}`;
    }
  } catch (err) {
    error = `Error fetching post: ${err instanceof Error ? err.message : "Unknown error"}`;
    console.error(error);
  }

  if (!post || !post.content) {
    return (
      <div className="prose prose-invert max-w-none p-4">
        <p className="text-gray-300">{error || "No content available"}</p>
      </div>
    );
  }

  return (
    <article className="prose prose-invert max-w-none p-4">
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}