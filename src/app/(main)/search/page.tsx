"use client";

import BlogSearch from "@/components/GlassSearchBlogs";
import { searchPosts, Post } from "@/lib/wordpress";
import Link from "next/link";
import Image from "next/image";
import sanitizeHtml from "sanitize-html";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

const POSTS_PER_PAGE = 12;

// Main content component that uses useSearchParams
function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const currentPage = Math.max(1, parseInt(searchParams.get("page") || "1", 10)) || 1;
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch posts when query changes
  useEffect(() => {
    if (query) {
      setIsLoading(true);
      const fetchPosts = async () => {
        try {
          const fetchedPosts = await searchPosts(query);
          setPosts(fetchedPosts);
          setError(null);
        } catch (err) {
          setError("Failed to fetch posts. Please try again later.");
          console.error("Search error:", err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchPosts();
    } else {
      setPosts([]);
      setError(null);
      setIsLoading(false);
    }
  }, [query]);

  // Split query into individual words and filter posts where all words appear in the title
  const queryWords = query.toLowerCase().split(/\s+/).filter((word) => word.length > 0);
  const filteredPosts = posts.filter((post: Post) => {
    const title = (post.title || "").toLowerCase();
    return queryWords.every((word) => title.includes(word));
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const validPage = Math.max(1, Math.min(currentPage, totalPages));
  const startIndex = (validPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  // Highlight the query words in the title or excerpt
  const highlightQuery = (text: string | undefined, query: string) => {
    if (!text) return "";
    if (!query) return text;

    const words = query.toLowerCase().split(/\s+/).filter((word) => word.length > 0);
    let highlightedText: string = text;

    words.forEach((word) => {
      const regex = new RegExp(
        `(${word.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")})`,
        "gi"
      );
      highlightedText = highlightedText.replace(
        regex,
        "<mark class='bg-yellow-200'>$1</mark>"
      );
    });

    return highlightedText;
  };

  // Sanitize HTML
  const cleanHtml = (html: string, highlight: string = "") =>
    sanitizeHtml(highlight ? highlightQuery(html, highlight) : html, {
      allowedTags: ["b", "i", "em", "strong", "a", "p", "mark"],
      allowedAttributes: { a: ["href"], mark: ["class"] },
    });

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">
        Search Results for: <span className="text-blue-600">&quot;{query}&quot;</span>
      </h1>
      <div className="max-w-xl mx-auto mb-8">
        <BlogSearch />
      </div>

      {isLoading ? (
        <p className="text-gray-500 text-lg text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-lg text-center">{error}</p>
      ) : paginatedPosts.length === 0 ? (
        <p className="text-gray-500 text-lg text-center">No blog posts found for &quot;{query}&quot;.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {paginatedPosts.map((post: Post) => (
              <div
                key={post.id}
                className="border rounded-2xl shadow-md bg-white overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Thumbnail */}
                {post.featuredImage && (
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                    width={400}
                    height={192}
                    sizes="(max-width: 768px) 100vw, 400px"
                    placeholder="blur"
                    blurDataURL="/placeholder.jpg"
                  />
                )}

                {/* Card Content */}
                <div className="p-6 flex flex-col justify-between h-full">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: cleanHtml(post.title, query) }}
                  />
                  <div
                    className="text-gray-600 mt-3 text-sm line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: cleanHtml(post.excerpt, query) }}
                  />
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-4 inline-block text-sm font-medium text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-12 flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 flex-wrap justify-center">
                {/* Previous Button */}
                <Link
                  href={`/search?query=${encodeURIComponent(query)}&page=${validPage - 1}`}
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

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <Link
                    key={pageNum}
                    href={`/search?query=${encodeURIComponent(query)}&page=${pageNum}`}
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

                {/* Next Button */}
                <Link
                  href={`/search?query=${encodeURIComponent(query)}&page=${validPage + 1}`}
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
                Page {validPage} of {totalPages} ({filteredPosts.length} posts)
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Main page component with Suspense boundary
export default function SearchPage() {
  return (
    <Suspense fallback={<p className="text-gray-500 text-lg text-center">Loading search results...</p>}>
      <SearchContent />
    </Suspense>
  );
}