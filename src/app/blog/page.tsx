import { getPosts } from "@/lib/wordpress";
import BlogList from "@/components/BlogList";
import Link from "next/link";

// Enable ISR with revalidation every 60 seconds
export const revalidate = 60;

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: { page?: string }; // ✅ just an object, not a Promise
}) {
  // Safely read current page from searchParams, default to 1
  const currentPage = parseInt(searchParams?.page || "1", 10);

  // Fetch posts (ISR will keep this fresh)
  const posts = await getPosts();
  const postsPerPage = 12;
  const totalPages = Math.ceil(posts.length / postsPerPage) || 1;

  const validPage = Math.max(1, Math.min(currentPage, totalPages));

  // Slice posts for current page
  const startIndex = (validPage - 1) * postsPerPage;
  const paginatedPosts = posts.slice(startIndex, startIndex + postsPerPage);

  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-10 tracking-tight">
        Explore Our Blog
      </h1>

      {posts.length === 0 ? (
        <p className="text-gray-500 text-lg text-center">No blog posts found.</p>
      ) : (
        <>
          {/* Blog Grid */}
          <BlogList initialPosts={paginatedPosts} />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 flex-wrap justify-center">
                {/* Previous */}
                <Link
                  href={`/blog?page=${validPage - 1}`}
                  className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                    validPage === 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
                  }`}
                  aria-disabled={validPage === 1}
                  aria-label="Previous page"
                >
                  &larr; Prev
                </Link>

                {/* Page numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <Link
                    key={pageNum}
                    href={`/blog?page=${pageNum}`}
                    className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                      pageNum === validPage
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm"
                    }`}
                    aria-label={`Page ${pageNum}`}
                    aria-current={pageNum === validPage ? "page" : undefined}
                  >
                    {pageNum}
                  </Link>
                ))}

                {/* Next */}
                <Link
                  href={`/blog?page=${validPage + 1}`}
                  className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                    validPage === totalPages
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
                  }`}
                  aria-disabled={validPage === totalPages}
                  aria-label="Next page"
                >
                  Next &rarr;
                </Link>
              </div>

              <p className="text-gray-600 text-sm">
                Page {validPage} of {totalPages} ({posts.length} posts)
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
}
