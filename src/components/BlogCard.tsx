import Link from "next/link";
import Image from "next/image";
import { Post } from "@/lib/wordpress";

export default function BlogCard({ post }: { post: Post }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      {post.featuredImage && (
        <Image
          src={post.featuredImage}
          alt={post.title}
          width={600}
          height={400}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-4">
        {/* ✅ must not be self-closing */}
        <h2
          className="text-xl font-semibold mb-2"
          dangerouslySetInnerHTML={{ __html: post.title }}
        ></h2>

        <div
          className="text-gray-600 mb-4 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: post.excerpt }}
        ></div>

        <Link
          href={`/blog/${post.slug}`}
          className="text-blue-600 font-medium hover:underline"
        >
          Read more →
        </Link>
      </div>
    </div>
  );
}
