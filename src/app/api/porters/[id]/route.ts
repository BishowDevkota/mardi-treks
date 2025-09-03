// src/app/api/porters/[id]/route.ts
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
      console.error('Invalid porter ID:', id);
      return new Response(JSON.stringify({ error: 'Invalid porter ID' }), { status: 400 });
    }
    const porter = await db.collection('porters').findOne({ _id: new ObjectId(id) });
    if (!porter) {
      return new Response(JSON.stringify({ error: 'Porter not found' }), { status: 404 });
    }
    return new Response(JSON.stringify(porter), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('Error fetching porter:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch porter' }), { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const client = await clientPromise;
    const db = client.db('trekdb');
    const { id } = await params; // Await params
    if (!id || !ObjectId.isValid(id)) {
      console.error('Invalid porter ID:', id);
      return new Response(JSON.stringify({ error: 'Invalid porter ID' }), { status: 400 });
    }
    const data = await request.json();

    // Validate input (only mobile and salary are editable)
    const { mobile, salary } = data;
    if (!mobile || !salary) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    // Fetch existing porter to retain non-editable fields
    const existingPorter = await db.collection('porters').findOne({ _id: new ObjectId(id) });
    if (!existingPorter) {
      return new Response(JSON.stringify({ error: 'Porter not found' }), { status: 404 });
    }

    const porterData = {
      name: existingPorter.name,
      dateOfBirth: existingPorter.dateOfBirth,
      age: calculateAge(existingPorter.dateOfBirth),
      gender: existingPorter.gender,
      mobile: mobile.trim(),
      salary: parseFloat(salary),
      nnid: existingPorter.nnid,
      updatedAt: new Date(),
    };

    // Check for duplicate mobile (excluding current porter)
    const duplicatePorter = await db.collection('porters').findOne({
      mobile: porterData.mobile,
      _id: { $ne: new ObjectId(id) },
    });
    if (duplicatePorter) {
      return new Response(JSON.stringify({ error: 'Porter with this mobile number already exists' }), { status: 400 });
    }

    const result = await db.collection('porters').updateOne(
      { _id: new ObjectId(id) },
      { $set: porterData }
    );
    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ error: 'Porter not found' }), { status: 404 });
    }
    return new Response(JSON.stringify({ message: 'Porter updated successfully' }), { status: 200 });
  } catch (error: unknown) {
    console.error('Error updating porter:', error);
    return new Response(JSON.stringify({ error: 'Failed to update porter' }), { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const client = await clientPromise;
    const db = client.db('trekdb');
    const { id } = await params; // Await params
    if (!id || !ObjectId.isValid(id)) {
      console.error('Invalid porter ID:', id);
      return new Response(JSON.stringify({ error: 'Invalid porter ID' }), { status: 400 });
    }
    const result = await db.collection('porters').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ error: 'Porter not found' }), { status: 404 });
    }
    return new Response(JSON.stringify({ message: 'Porter deleted successfully' }), { status: 200 });
  } catch (error: unknown) {
    console.error('Error deleting porter:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete porter' }), { status: 500 });
  }
}