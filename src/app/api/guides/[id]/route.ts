// src/app/api/guides/[id]/route.ts
import clientPromise from '@/lib/mongodb';
import { NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';
import { calculateAge } from '@/functions/calculateAge';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const client = await clientPromise;
    const db = client.db('trekdb');
    const { id } = await params; // Await params
    if (!id || !ObjectId.isValid(id)) {
      console.error('Invalid guide ID:', id);
      return new Response(JSON.stringify({ error: 'Invalid guide ID' }), { status: 400 });
    }
    const guide = await db.collection('guides').findOne({ _id: new ObjectId(id) });
    if (!guide) {
      return new Response(JSON.stringify({ error: 'Guide not found' }), { status: 404 });
    }
    return new Response(JSON.stringify(guide), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('Error fetching guide:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch guide' }), { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const client = await clientPromise;
    const db = client.db('trekdb');
    const { id } = await params; // Await params
    if (!id || !ObjectId.isValid(id)) {
      console.error('Invalid guide ID:', id);
      return new Response(JSON.stringify({ error: 'Invalid guide ID' }), { status: 400 });
    }
    const data = await request.json();

    // Validate input (only mobile and salary are editable)
    const { mobile, salary } = data;
    if (!mobile || !salary) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    // Fetch existing guide to retain non-editable fields
    const existingGuide = await db.collection('guides').findOne({ _id: new ObjectId(id) });
    if (!existingGuide) {
      return new Response(JSON.stringify({ error: 'Guide not found' }), { status: 404 });
    }

    const guideData = {
      name: existingGuide.name,
      dateOfBirth: existingGuide.dateOfBirth,
      age: calculateAge(existingGuide.dateOfBirth),
      gender: existingGuide.gender,
      mobile: mobile.trim(),
      salary: parseFloat(salary),
      nnid: existingGuide.nnid,
      updatedAt: new Date(),
    };

    // Check for duplicate mobile (excluding current guide)
    const duplicateGuide = await db.collection('guides').findOne({
      mobile: guideData.mobile,
      _id: { $ne: new ObjectId(id) },
    });
    if (duplicateGuide) {
      return new Response(JSON.stringify({ error: 'Guide with this mobile number already exists' }), { status: 400 });
    }

    const result = await db.collection('guides').updateOne(
      { _id: new ObjectId(id) },
      { $set: guideData }
    );
    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ error: 'Guide not found' }), { status: 404 });
    }
    return new Response(JSON.stringify({ message: 'Guide updated successfully' }), { status: 200 });
  } catch (error: unknown) {
    console.error('Error updating guide:', error);
    return new Response(JSON.stringify({ error: 'Failed to update guide' }), { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const client = await clientPromise;
    const db = client.db('trekdb');
    const { id } = await params; // Await params
    if (!id || !ObjectId.isValid(id)) {
      console.error('Invalid guide ID:', id);
      return new Response(JSON.stringify({ error: 'Invalid guide ID' }), { status: 400 });
    }
    const result = await db.collection('guides').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ error: 'Guide not found' }), { status: 404 });
    }
    return new Response(JSON.stringify({ message: 'Guide deleted successfully' }), { status: 200 });
  } catch (error: unknown) {
    console.error('Error deleting guide:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete guide' }), { status: 500 });
  }
}