export const WORDPRESS_API = "https://marditreks.com/wp-json/wp/v2";

// Define the interface for a cleaned WordPress post
export interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  featuredImage?: string;
  date?: string;
}

// Define the interface for raw WordPress API response
interface RawWordPressPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content?: { rendered: string };
  date?: string;
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string }>;
  };
}

// Helper: map raw WP post into our Post interface
function mapPost(raw: RawWordPressPost): Post {
  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title?.rendered || "",
    excerpt: raw.excerpt?.rendered || "",
    content: raw.content?.rendered || "",
    date: raw.date || "",
    featuredImage: raw._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "",
  };
}

// Helper: fetch with retry logic
async function fetchWithRetry(url: string, options: RequestInit = {}, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    const res = await fetch(`${url}&_=${Date.now()}`, {
      ...options,
      cache: 'no-store', // Disable caching
    });
    if (res.ok) return res;
    if (i < retries - 1) await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  throw new Error(`Failed to fetch after ${retries} attempts`);
}

/**
 * Fetch all posts with pagination
 */
export async function getPosts(): Promise<Post[]> {
  const posts: Post[] = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const res = await fetchWithRetry(
      `${WORDPRESS_API}/posts?_embed&per_page=${perPage}&page=${page}`
    );

    const data: RawWordPressPost[] = await res.json();

    if (data.length === 0) break;

    posts.push(...data.map(mapPost));
    page++;

    const totalPages = parseInt(res.headers.get("X-WP-TotalPages") || "1", 10);
    if (page > totalPages) break;
  }

  return posts;
}

/**
 * Fetch a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const res = await fetchWithRetry(
    `${WORDPRESS_API}/posts?slug=${slug}&_embed`
  );

  const data: RawWordPressPost[] = await res.json();
  return data.length > 0 ? mapPost(data[0]) : null;
}

/**
 * Search posts by query string
 */
export async function searchPosts(query: string): Promise<Post[]> {
  if (!query) return [];

  const posts: Post[] = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const res = await fetchWithRetry(
      `${WORDPRESS_API}/posts?search=${encodeURIComponent(query)}&_embed&per_page=${perPage}&page=${page}`
    );

    const data: RawWordPressPost[] = await res.json();

    if (data.length === 0) break;

    posts.push(...data.map(mapPost));
    page++;

    const totalPages = parseInt(res.headers.get("X-WP-TotalPages") || "1", 10);
    if (page > totalPages) break;
  }

  return posts;
}

export async function getRecentPosts(count: number): Promise<Post[]> {
  const res = await fetchWithRetry(
    `${WORDPRESS_API}/posts?_embed&per_page=${count}&orderby=date&order=desc`
  );

  const data: RawWordPressPost[] = await res.json();
  return data.map(mapPost);
}