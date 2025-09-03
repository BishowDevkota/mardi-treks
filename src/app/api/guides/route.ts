// src/app/api/guides/route.ts
import clientPromise from '@/lib/mongodb';
import { NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';
import { calculateAge } from '@/functions/calculateAge';

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('trekdb');
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name')?.trim();

    const query: any = {};
    if (name) {
      query.name = { $regex: name, $options: 'i' }; // Case-insensitive name search
    }

    const guides = await db.collection('guides').find(query).toArray();
    return new Response(JSON.stringify(guides), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error fetching guides:', error.message, error.stack);
    return new Response(JSON.stringify({ error: 'Failed to fetch guides' }), { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('trekdb');
    const data = await request.json();

    // Validate input
    const { name, dateOfBirth, gender, mobile, salary, nnid } = data;
    if (!name || !dateOfBirth || !gender || !mobile || !salary || !nnid) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    // Validate dateOfBirth format (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth)) {
      return new Response(JSON.stringify({ error: 'Invalid dateOfBirth format (use YYYY-MM-DD)' }), { status: 400 });
    }

    // Validate nnid (non-empty string)
    if (nnid.trim().length === 0) {
      return new Response(JSON.stringify({ error: 'NNID cannot be empty' }), { status: 400 });
    }

    const guideData = {
      name: name.trim(),
      dateOfBirth: dateOfBirth.trim(),
      age: calculateAge(dateOfBirth),
      gender: gender.trim(),
      mobile: mobile.trim(),
      salary: parseFloat(salary),
      nnid: nnid.trim(),
      createdAt: new Date(),
    };

    // Check for duplicate mobile or nnid
    const existingGuide = await db.collection('guides').findOne({
      $or: [{ mobile: guideData.mobile }, { nnid: guideData.nnid }],
    });
    if (existingGuide) {
      return new Response(
        JSON.stringify({ error: 'Guide with this mobile number or NNID already exists' }),
        { status: 400 }
      );
    }

    const result = await db.collection('guides').insertOne(guideData);
    console.log(`Guide created: ${result.insertedId}`);
    return new Response(JSON.stringify({ guideId: result.insertedId.toString() }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error creating guide:', error.message, error.stack);
    return new Response(JSON.stringify({ error: 'Failed to create guide' }), { status: 500 });
  }
}