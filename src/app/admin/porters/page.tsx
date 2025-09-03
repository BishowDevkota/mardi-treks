import PorterTable from '@/components/Admin/Porters/PorterTable';

async function getPorters() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/porters`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch porters');
  }
  return res.json();
}

export default async function PorterPage() {
  const porters = await getPorters();
  return <PorterTable porters={porters} />;
}