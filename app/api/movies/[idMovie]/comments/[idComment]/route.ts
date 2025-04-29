import { NextResponse } from 'next/server';
import { Db, MongoClient, ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

export async function GET(request: Request, context: { params: Record<string, string> }): Promise<NextResponse> {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('sample_mflix');
    const { idMovie, idComment } = context.params;

    if (!ObjectId.isValid(idComment)) {
      return NextResponse.json({ status: 400, message: 'Invalid comment ID', error: 'ID format is incorrect' });
    }

    const comment = await db.collection('comments').findOne({
      _id: new ObjectId(idComment),
      movie_id: new ObjectId(idMovie)
    });

    if (!comment) {
      return NextResponse.json({ status: 404, message: 'Comment not found' });
    }

    return NextResponse.json({ status: 200, data: { comment } });
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
}

export async function POST(): Promise<NextResponse> {
  return NextResponse.json({ status: 405, message: 'POST not allowed on specific comment. Use /comments instead.' });
}

export async function PUT(): Promise<NextResponse> {
  return NextResponse.json({ status: 405, message: 'PUT not implemented yet' });
}

export async function DELETE(request: Request, context: { params: Record<string, string> }): Promise<NextResponse> {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('sample_mflix');
    const { idComment } = context.params;

    if (!ObjectId.isValid(idComment)) {
      return NextResponse.json({ status: 400, message: 'Invalid comment ID' });
    }

    const result = await db.collection('comments').deleteOne({ _id: new ObjectId(idComment) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ status: 404, message: 'Comment not found' });
    }

    return NextResponse.json({ status: 200, message: 'Comment deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
}
