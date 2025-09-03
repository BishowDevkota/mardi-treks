// src/app/blog/loading.tsx
export default function Loading() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600">Loading Blogs...</p>
    </section>
  );
}
