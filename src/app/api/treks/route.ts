// app/api/treks/route.ts
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('trekking'); // Use 'trekking' database
    const treks = await db.collection('treks').find({}).toArray();
    return NextResponse.json(treks);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch treks' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('trekking');
    const body = await req.json();
    // Validate pricing: max 6 rows
    if (body.pricing && body.pricing.length > 6) {
      return NextResponse.json({ error: 'Pricing cannot exceed 6 rows' }, { status: 400 });
    }
    const result = await db.collection('treks').insertOne(body);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create trek' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('trekking');
    const body = await req.json();
    const { _id, ...updateData } = body;
    // Validate pricing: max 6 rows
    if (updateData.pricing && updateData.pricing.length > 6) {
      return NextResponse.json({ error: 'Pricing cannot exceed 6 rows' }, { status: 400 });
    }
    const result = await db.collection('treks').updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateData }
    );
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update trek' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('trekking');
    const { searchParams } = new URL(req.url);
    const _id = searchParams.get('id');
    if (!_id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    const result = await db.collection('treks').deleteOne({ _id: new ObjectId(_id) });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete trek' }, { status: 500 });
  }
}