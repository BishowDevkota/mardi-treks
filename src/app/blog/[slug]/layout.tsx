import "@/app/globals.css";
import BlogLeftSideBar from "@/components/Blog/BlogLeftSideBar";
import BlogRightSideBar from "@/components/Blog/BlogRightSideBar";
import SubHero from "@/components/SubHeroComponent";
import { getPostBySlug } from "@/lib/wordpress";
import { Suspense } from "react";

export default async function SinglePostLayout({ children, params }: { children: React.ReactNode; params: Promise<{ slug: string }> }) {
  const { slug } = await params; // Await params to access slug
  let post = null;
  try {
    post = await getPostBySlug(slug); // Fetch post data for title and featured image
  } catch (error) {
    console.error(`Error fetching post in layout for slug ${slug}:`, error);
  }

  // Default values if post is not found
  const siteTitle = post?.title || "Blog";
  const backgroundImage = post?.featuredImage || "/images/sub-hero-bg.jpg";

  return (
    <>
      <SubHero siteTitle={siteTitle} backgroundImage={backgroundImage} />
      <Suspense fallback={<div className="container mx-auto px-0 py-4 text-center text-gray-300">Loading content...</div>}>
        <main className="container mx-auto px-0 py-0 flex flex-row">
          <div className="w-[20%] bg-gray-100">
            <BlogLeftSideBar slug={slug} />
          </div>
          <div className="w-[5%]" />
          <div className="w-[50%]">
            {children}
          </div>
          <div className="w-[5%]" />
          <div className="w-[20%]">
            <BlogRightSideBar />
          </div>
        </main>
      </Suspense>
    </>
  );
}