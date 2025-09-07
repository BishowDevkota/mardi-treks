// app/api/treks/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db('trekking');
    const trek = await db.collection('treks').findOne({ slug: params.slug });
    if (!trek) {
      return NextResponse.json({ error: 'Trek not found' }, { status: 404 });
    }
    return NextResponse.json(trek);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch trek' }, { status: 500 });
  }
}