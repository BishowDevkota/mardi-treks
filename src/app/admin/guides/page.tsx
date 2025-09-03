import GuideTable from '@/components/Admin/Guides/GuideTable';

async function getGuides() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/guides`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch guides');
  }
  return res.json();
}

export default async function GuidePage() {
  const guides = await getGuides();
  return <GuideTable guides={guides} />;
}