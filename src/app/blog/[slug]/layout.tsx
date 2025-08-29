import "@/app/globals.css";
import BlogLeftSideBar from "@/components/Blog/BlogLeftSideBar";
import BlogRightSideBar from "@/components/Blog/BlogRightSideBar";
import SubHero from "@/components/SubHeroComponent";
import { getPostBySlug } from "@/lib/wordpress";
import { Suspense } from "react";

export default async function SinglePostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let post = null;
  try {
    post = await getPostBySlug(slug);
  } catch (error) {
    console.error(`Error fetching post in layout for slug ${slug}:`, error);
  }

  const siteTitle = post?.title || "Blog";
  const backgroundImage = post?.featuredImage || "/images/sub-hero-bg.jpg";

  return (
    <>
      <SubHero siteTitle={siteTitle} backgroundImage={backgroundImage} />
      <Suspense
        fallback={
          <div className="container mx-auto px-0 py-4 text-center text-gray-300">
            Loading content...
          </div>
        }
      >
        <main className="container mx-auto flex flex-col lg:flex-row gap-6 px-4 lg:px-0 py-6">
          {/* Left Sidebar (hidden on mobile, sticky on lg+) */}
          <aside className="hidden lg:block w-full lg:w-1/5">
            <BlogLeftSideBar slug={slug} />
          </aside>

          {/* Main Content */}
          <div className="w-full lg:w-3/5">{children}</div>

          {/* Right Sidebar */}
          <aside className="hidden lg:block w-full lg:w-1/5">
            <BlogRightSideBar />
          </aside>
        </main>
      </Suspense>
    </>
  );
}
