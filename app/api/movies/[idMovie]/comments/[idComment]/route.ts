// page/api/movies/[idMovie]/comments/[idComment]/route.ts

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Db, MongoClient, ObjectId } from 'mongodb';

/**
 * @swagger
 * /api/movies/{idMovie}/comments/{idComment}:
 *   get:
 *     summary: Get a comment by ID
 *     description: Retrieve a single comment document by its MongoDB ObjectId.
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the movie
 *       - in: path
 *         name: idComment
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the comment
 *     responses:
 *       200:
 *         description: Comment found
 *       400:
 *         description: Invalid comment ID
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */
export async function GET(request: Request, { params }: { params: any }): Promise<NextResponse> {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('sample_mflix');

    const { idMovie, idComment } = params;

    if (!ObjectId.isValid(idMovie) || !ObjectId.isValid(idComment)) {
      return NextResponse.json({ status: 400, message: 'Invalid ID', error: 'ID format is incorrect' });
    }

    const comment = await db.collection('comments').findOne({
      _id: new ObjectId(idComment),
      movie_id: new ObjectId(idMovie),
    });

    if (!comment) {
      return NextResponse.json({ status: 404, message: 'Comment not found', error: 'No comment found with the given ID' });
    }

    return NextResponse.json({ status: 200, data: { comment } });
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
}

/**
 * @swagger
 * /api/movies/{idMovie}/comments/{idComment}:
 *   post:
 *     summary: Add a comment to a movie
 *     description: Create a new comment linked to a movie.
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the movie
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       400:
 *         description: Invalid movie ID
 *       500:
 *         description: Internal server error
 */
export async function POST(request: Request, { params }: { params: any }): Promise<NextResponse> {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('sample_mflix');
    const { idMovie } = params;

    if (!ObjectId.isValid(idMovie)) {
      return NextResponse.json({ status: 400, message: 'Invalid movie ID', error: 'ID format is incorrect' });
    }

    const comment = {
      movie_id: new ObjectId(idMovie),
      name: "John Doe",
      email: "john@example.com",
      text: "Amazing movie!",
      date: new Date(),
    };

    const result = await db.collection('comments').insertOne(comment);

    return NextResponse.json({ status: 201, message: 'Comment created successfully', data: { insertedId: result.insertedId } });
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
}

/**
 * @swagger
 * /api/movies/{idMovie}/comments/{idComment}:
 *   put:
 *     summary: Update a comment by ID
 *     description: Update a comment document with a specific ID.
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the movie
 *       - in: path
 *         name: idComment
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the comment
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       400:
 *         description: Invalid comment ID
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */
export async function PUT(request: Request, { params }: { params: any }): Promise<NextResponse> {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('sample_mflix');
    const { idMovie, idComment } = params;

    if (!ObjectId.isValid(idMovie) || !ObjectId.isValid(idComment)) {
      return NextResponse.json({ status: 400, message: 'Invalid ID', error: 'ID format is incorrect' });
    }

    const updatedComment = {
      name: "Jane Doe",
      email: "jane@example.com",
      text: "Updated comment content.",
      date: new Date(),
    };

    const result = await db.collection('comments').updateOne(
      {
        _id: new ObjectId(idComment),
        movie_id: new ObjectId(idMovie),
      },
      { $set: updatedComment }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ status: 404, message: 'Comment not found', error: 'No comment to update with the given ID' });
    }

    return NextResponse.json({ status: 200, message: 'Comment updated successfully' });
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
}

/**
 * @swagger
 * /api/movies/{idMovie}/comments/{idComment}:
 *   delete:
 *     summary: Delete a comment by ID
 *     description: Delete a comment document using its ID.
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the movie
 *       - in: path
 *         name: idComment
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the comment
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       400:
 *         description: Invalid comment ID
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */
export async function DELETE(request: Request, { params }: { params: any }): Promise<NextResponse> {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('sample_mflix');
    const { idMovie, idComment } = params;

    if (!ObjectId.isValid(idMovie) || !ObjectId.isValid(idComment)) {
      return NextResponse.json({ status: 400, message: 'Invalid ID', error: 'ID format is incorrect' });
    }

    const result = await db.collection('comments').deleteOne({
      _id: new ObjectId(idComment),
      movie_id: new ObjectId(idMovie),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ status: 404, message: 'Comment not found', error: 'No comment to delete with the given ID' });
    }

    return NextResponse.json({ status: 200, message: 'Comment deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
}
