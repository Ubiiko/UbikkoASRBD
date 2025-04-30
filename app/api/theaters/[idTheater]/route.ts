// page/api/theaters/[idTheater]/route.ts

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Db, MongoClient, ObjectId } from 'mongodb';

/**
 * @swagger
 * /api/theaters/{idTheater}:
 *   get:
 *     summary: Get a theater by ID
 *     description: Retrieve a single theater document by its MongoDB ObjectId.
 *     parameters:
 *       - in: path
 *         name: idTheater
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the theater
 *     responses:
 *       200:
 *         description: Theater found
 *       400:
 *         description: Invalid theater ID
 *       404:
 *         description: Theater not found
 *       500:
 *         description: Internal server error
 */
export async function GET(request: Request, { params }: { params: any }): Promise<NextResponse> {
  try {
    const { idTheater } = params;

    // Vérification si l'ID est bien un ObjectId valide
    if (!ObjectId.isValid(idTheater)) {
      return NextResponse.json({ status: 400, message: 'Invalid theater ID', error: 'ID format is incorrect' });
    }

    const client: MongoClient = await clientPromise;
    const db: Db = client.db('sample_mflix');

    // Conversion explicite de l'ID en ObjectId
    const objectId = new ObjectId(idTheater);

    const theater = await db.collection('theaters').findOne({ _id: objectId });

    if (!theater) {
      return NextResponse.json({ status: 404, message: 'Theater not found', error: 'No theater found with the given ID' });
    }

    return NextResponse.json({ status: 200, data: { theater } });
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
}


/**
 * @swagger
 * /api/theaters/{idTheater}:
 *   post:
 *     summary: Create a new theater
 *     description: Add a new theater to the collection.
 *     parameters:
 *       - in: path
 *         name: idTheater
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the theater
 *     responses:
 *       201:
 *         description: Theater created successfully
 *       500:
 *         description: Internal server error
 */
export async function POST(): Promise<NextResponse> {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('sample_mflix');

    const theater = {
      theaterId: 1010,
      location: {
        address: {
          street1: "1025 Veterans Pkwy",
          city: "Clarksville",
          state: "IN",
          zipcode: "47129"
        },
        geo: {
          type: "Point",
          coordinates: [-85.76461, 38.327175]
        }
      }
    };

    const result = await db.collection('theaters').insertOne(theater);

    return NextResponse.json({ status: 201, message: 'Theater created successfully', data: { insertedId: result.insertedId } });
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
}

/**
 * @swagger
 * /api/theaters/{idTheater}:
 *   put:
 *     summary: Update a theater by ID
 *     description: Update the theater document with a specific ID.
 *     parameters:
 *       - in: path
 *         name: idTheater
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the theater
 *     responses:
 *       200:
 *         description: Theater updated successfully
 *       400:
 *         description: Invalid theater ID
 *       404:
 *         description: Theater not found
 *       500:
 *         description: Internal server error
 */
export async function PUT(_: Request, { params }: { params: any }): Promise<NextResponse> {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('sample_mflix');
    const { idTheater } = params;

    if (!ObjectId.isValid(idTheater) || idTheater.length !== 24) {
      return NextResponse.json({ status: 400, message: 'Invalid theater ID', error: 'ID format is incorrect' });
    }

    const updatedTheater = {
      theaterId: 1010,
      location: {
        address: {
          street1: "456 Update Blvd",
          city: "Filmville",
          state: "NY",
          zipcode: "10001"
        },
        geo: {
          type: "Point",
          coordinates: [-74.0060, 40.7128]
        }
      }
    };

    const result = await db.collection('theaters').updateOne(
      { _id: new ObjectId(idTheater) },
      { $set: updatedTheater }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ status: 404, message: 'Theater not found', error: 'No theater to update with the given ID' });
    }

    return NextResponse.json({ status: 200, message: 'Theater updated successfully' });
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
}

/**
 * @swagger
 * /api/theaters/{idTheater}:
 *   delete:
 *     summary: Delete a theater by ID
 *     description: Delete a theater document using its ID.
 *     parameters:
 *       - in: path
 *         name: idTheater
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the theater
 *     responses:
 *       200:
 *         description: Theater deleted successfully
 *       400:
 *         description: Invalid theater ID
 *       404:
 *         description: Theater not found
 *       500:
 *         description: Internal server error
 */
export async function DELETE(_: Request, { params }: { params: any }): Promise<NextResponse> {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('sample_mflix');
    const { idTheater } = params;

    if (!ObjectId.isValid(idTheater) || idTheater.length !== 24) {
      return NextResponse.json({ status: 400, message: 'Invalid theater ID', error: 'ID format is incorrect' });
    }

    const result = await db.collection('theaters').deleteOne({ _id: new ObjectId(idTheater) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ status: 404, message: 'Theater not found', error: 'No theater to delete with the given ID' });
    }

    return NextResponse.json({ status: 200, message: 'Theater deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
}
