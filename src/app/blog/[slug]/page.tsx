// import Image from "next/image";
// import BlogSearch from "@/components/GlassSearchBlogs";
// import { getPostBySlug, getPosts, Post } from "@/lib/wordpress";
// import Link from "next/link";

// // Helper: extract H2 headings from content and create proper IDs
// function extractHeadings(content: string): { id: string; text: string }[] {
//   const regex = /<h2.*?>(.*?)<\/h2>/g;
//   const headings: { id: string; text: string }[] = [];
//   let match;

//   while ((match = regex.exec(content)) !== null) {
//     const text = match[1].replace(/<[^>]+>/g, "");
//     const id = text
//       .toLowerCase()
//       .replace(/[^\w\s-]/g, "")
//       .replace(/\s+/g, "-")
//       .replace(/--+/g, "-")
//       .trim();
//     headings.push({ id, text });
//   }

//   return headings;
// }

// // Helper: inject proper IDs into h2 tags
// function addIdsToHeadings(content: string, headings: { id: string; text: string }[]): string {
//   let index = 0;
//   return content.replace(/<h2(.*?)>(.*?)<\/h2>/g, (match, attrs, inner) => {
//     const heading = headings[index++];
//     if (heading) {
//       return `<h2 id="${heading.id}" class="scroll-mt-24 text-2xl md:text-3xl font-bold text-gray-900 mb-4 mt-8 border-l-4 border-blue-500 pl-4"${attrs}>${inner}</h2>`;
//     }
//     return match;
//   });
// }

// // Add generateStaticParams to define dynamic routes
// export async function generateStaticParams() {
//   const posts: Post[] = await getPosts(); // Fetch all posts
//   return posts.map((post) => ({
//     slug: post.slug, // Return the slug for each post
//   }));
// }

// export default async function BlogSingle({ params }: { params: Promise<{ slug: string }> }) {
//   // Await params before using
//   const { slug } = await params;

//   const post: Post | null = await getPostBySlug(slug);
//   const recentPosts: Post[] = await getPosts();

//   if (!post) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
//         <div className="text-center">
//           <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
//             <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//               />
//             </svg>
//           </div>
//           <h2 className="text-2xl font-semibold text-gray-700 mb-2">Post Not Found</h2>
//           <p className="text-gray-500">The blog post you&apos;re looking for doesn&apos;t exist.</p>
//         </div>
//       </div>
//     );
//   }

//   const featuredImg = post.featuredImage || "/default.jpg";
//   const altText = post.title.replace(/<[^>]+>/g, "") || "Featured image for blog post";

//   const headings = extractHeadings(post.content || "");
//   const contentWithIds = addIdsToHeadings(post.content || "", headings);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
//       {/* Hero Section */}
//       <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20 z-10" />
//         <Image
//           src={featuredImg}
//           alt={altText}
//           className="w-full h-full object-cover"
//           width={1200}
//           height={600}
//           sizes="(max-width: 768px) 100vw, 1200px"
//           placeholder="blur"
//           blurDataURL="/placeholder.jpg"
//         />
//         <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-12">
//           <div className="max-w-4xl mx-auto">
//             <h1
//               className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg"
//               dangerouslySetInnerHTML={{ __html: post.title }}
//             />
//             <div className="max-w-xl mb-4">
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                   </svg>
//                 </div>
//                 <BlogSearch />
//               </div>
//             </div>
//             <nav className="flex items-center space-x-2 text-sm text-white/80 mb-4">
//               <Link href="/" className="hover:text-white transition-colors">
//                 Home
//               </Link>
//               <span>/</span>
//               <Link href="/blog" className="hover:text-white transition-colors">
//                 Blog
//               </Link>
//               <span>/</span>
//               <span className="text-white/90 font-medium truncate max-w-xs">{post.title.replace(/<[^>]+>/g, "")}</span>
//             </nav>
//             <div className="flex items-center text-white/90 text-sm md:text-base">
//               <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//               </svg>
//               Published on{" "}
//               {new Date(post.date || Date.now()).toLocaleDateString("en-US", {
//                 year: "numeric",
//                 month: "long",
//                 day: "numeric",
//               })}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="mx-auto px-12 py-8 lg:py-12">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//           {headings.length > 0 && (
//             <aside className="hidden lg:block lg:col-span-3 sticky top-8 bottom-8 h-[calc(100vh-4rem)]">
//               <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-white/20 p-6 h-full flex flex-col">
//                 <div className="flex items-center mb-6 flex-shrink-0">
//                   <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-3"></div>
//                   <h3 className="text-lg font-bold text-gray-900">Table of Contents</h3>
//                 </div>
//                 <nav className="space-y-3 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 pr-2">
//                   {headings.map((h, index) => (
//                     <div key={index} className="group">
//                       <a
//                         href={`#${h.id}`}
//                         className="flex items-start space-x-3 p-3 rounded-lg hover:bg-blue-50 hover:border-l-4 hover:border-blue-500 transition-all duration-200 text-sm text-gray-700 hover:text-blue-700 group-hover:translate-x-1"
//                       >
//                         <span className="flex-shrink-0 w-6 h-6 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center text-xs font-medium group-hover:bg-blue-100 group-hover:text-blue-700">
//                           {String(index + 1).padStart(2, "0")}
//                         </span>
//                         <span className="leading-tight">{h.text}</span>
//                       </a>
//                     </div>
//                   ))}
//                 </nav>
//               </div>
//             </aside>
//           )}
//           <article className={`${headings.length > 0 ? "lg:col-span-6" : "lg:col-span-9"}`}>
//             <div className="bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden relative">
//               <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
//               <div className="relative z-10 p-8 md:p-12 lg:p-16">
//                 <div
//                   className="prose prose-lg prose-blue max-w-none text-gray-800 scroll-smooth"
//                   dangerouslySetInnerHTML={{ __html: contentWithIds }}
//                 />
//               </div>
//             </div>
//           </article>

//           {/* Recent Posts */}
//           <aside className="lg:col-span-3 sticky top-8 bottom-8 h-[calc(100vh-4rem)]">
//             <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-white/20 p-6 h-full flex flex-col">
//               <div className="flex-1 overflow-hidden">
//                 <div className="flex items-center mb-6 flex-shrink-0">
//                   <div className="w-2 h-8 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full mr-3"></div>
//                   <h3 className="text-lg font-bold text-gray-900">Recent Posts</h3>
//                 </div>
//                 <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-16rem)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 pr-2">
//                   {recentPosts.slice(0, 10).map((p) => (
//                     <article key={p.slug} className="group">
//                       <Link
//                         href={`/blog/${p.slug}`}
//                         className="block p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 hover:shadow-md border border-transparent hover:border-blue-100"
//                       >
//                         <h4
//                           className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 mb-2 leading-snug line-clamp-2"
//                           dangerouslySetInnerHTML={{ __html: p.title }}
//                         />
//                       </Link>
//                     </article>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </aside>
//         </div>
//       </div>
//     </div>
//   );
// }










import { getPostBySlug } from "@/lib/wordpress";
import Image from "next/image";
import { notFound } from "next/navigation";

// Force runtime rendering (SSR/ISR)
export const dynamic = "force-dynamic";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>; // ✅ params is now a Promise
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  // ✅ Await params before destructuring
  const { slug } = await params;

  // Fetch post at runtime
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-10 tracking-tight">
        {post.title.replace(/&amp;/g, "&")}
      </h1>

      {post.featuredImage && (
        <div className="relative w-full h-[400px] mb-8">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, 800px"
            priority
          />
        </div>
      )}

      <div
        className="prose prose-lg mx-auto text-gray-700"
        dangerouslySetInnerHTML={{ __html: post.content || "" }}
      />
    </section>
  );
}

