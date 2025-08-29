"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Post } from "@/lib/wordpress";
import BlogList from "./BlogList";
import Link from "next/link";

interface BlogPageClientProps {
  allPosts: Post[];
}

export default function BlogPageClient({ allPosts }: BlogPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [posts] = useState(allPosts);
  const postsPerPage = 12;

  // Get current page from URL params, not from props
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const totalPages = Math.ceil(posts.length / postsPerPage) || 1;
  const validPage = Math.max(1, Math.min(currentPage, totalPages));

  const startIndex = (validPage - 1) * postsPerPage;
  const paginatedPosts = posts.slice(startIndex, startIndex + postsPerPage);

  // Update URL if page is invalid
  useEffect(() => {
    if (currentPage !== validPage && currentPage > 0) {
      router.replace(`/blog?page=${validPage}`);
    }
  }, [currentPage, validPage, router]);

  return (
    <div className="relative overflow-hidden">
      {/* Floating glass orbs - subtle and dark */}
      <div className="absolute top-20 left-20 w-4 h-4 bg-white/5 rounded-full animate-float"></div>
      <div className="absolute top-40 right-32 w-6 h-6 bg-white/3 rounded-full animate-float animation-delay-1000"></div>
      <div className="absolute bottom-32 left-40 w-3 h-3 bg-white/7 rounded-full animate-float animation-delay-2000"></div>

      <section className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-10 tracking-tight font-serif">
          Explore Our Blog
        </h1>

        {posts.length === 0 ? (
          <div className="group relative rounded-2xl overflow-hidden backdrop-blur-md bg-black/40 border border-white/20 shadow-2xl p-8 text-center">
            {/* Shining Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
            <p className="text-white/80 text-lg relative z-10">No blog posts found.</p>
          </div>
        ) : (
          <>
            {/* Blog List */}
            <BlogList initialPosts={paginatedPosts} />

            {/* Liquid Glass Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex flex-col items-center gap-6">
                {/* Main Pagination Container */}
                <div className="group relative rounded-2xl overflow-hidden backdrop-blur-md bg-black/40 border border-white/20 shadow-2xl p-6">
                  {/* Shining Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
                  
                  <div className="flex items-center gap-3 flex-wrap justify-center relative z-10">
                    {/* Previous Button */}
                    <Link
                      href={`/blog?page=${validPage - 1}`}
                      className={`group/btn relative px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 overflow-hidden ${
                        validPage === 1
                          ? "bg-black/30 text-white/40 cursor-not-allowed border border-white/10 pointer-events-none"
                          : "bg-black/50 text-white/90 hover:text-white border border-white/20 hover:border-white/30 hover:scale-105"
                      }`}
                      aria-disabled={validPage === 1}
                      aria-label="Previous page"
                      tabIndex={validPage === 1 ? -1 : 0}
                    >
                      {validPage > 1 && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                      )}
                      <span className="relative z-10">&larr; Prev</span>
                    </Link>

                    {/* Page Numbers */}
                    {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 7) {
                        pageNum = i + 1;
                      } else if (validPage <= 4) {
                        pageNum = i + 1;
                      } else if (validPage >= totalPages - 3) {
                        pageNum = totalPages - 6 + i;
                      } else {
                        pageNum = validPage - 3 + i;
                      }
                      
                      return (
                        <Link
                          key={pageNum}
                          href={`/blog?page=${pageNum}`}
                          className={`group/btn relative px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 overflow-hidden border ${
                            pageNum === validPage
                              ? "bg-white/20 text-white shadow-lg border-white/40 scale-105"
                              : "bg-black/30 text-white/80 hover:text-white border-white/20 hover:border-white/30 hover:bg-black/50 hover:scale-105"
                          }`}
                          aria-label={`Page ${pageNum}`}
                          aria-current={pageNum === validPage ? "page" : undefined}
                        >
                          {pageNum !== validPage && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                          )}
                          <span className="relative z-10">{pageNum}</span>
                        </Link>
                      );
                    })}

                    {/* Next Button */}
                    <Link
                      href={`/blog?page=${validPage + 1}`}
                      className={`group/btn relative px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 overflow-hidden ${
                        validPage === totalPages
                          ? "bg-black/30 text-white/40 cursor-not-allowed border border-white/10 pointer-events-none"
                          : "bg-black/50 text-white/90 hover:text-white border border-white/20 hover:border-white/30 hover:scale-105"
                      }`}
                      aria-disabled={validPage === totalPages}
                      aria-label="Next page"
                      tabIndex={validPage === totalPages ? -1 : 0}
                    >
                      {validPage < totalPages && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                      )}
                      <span className="relative z-10">Next &rarr;</span>
                    </Link>
                  </div>
                </div>

                {/* Page Info with Liquid Glass */}
                <div className="group relative rounded-xl overflow-hidden backdrop-blur-lg bg-black/30 border border-white/20 px-6 py-3">
                  {/* Shining Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
                  
                  <div className="flex items-center justify-center space-x-2 relative z-10">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <p className="text-white/80 text-sm font-medium">
                      Page {validPage} of {totalPages} • Showing {paginatedPosts.length} of {posts.length} posts
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}