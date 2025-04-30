// app/api/theaters/route.js

import { NextResponse } from 'next/server';
import { Db, MongoClient } from 'mongodb';
import clientPromise from '@/lib/mongodb';

/**
 * @swagger
 * /api/theaters:
 *   get:
 *     description: Returns a list of all theaters and cinemas
 *     responses:
 *       200:
 *         description: Hello Theaters
 */
export async function GET(): Promise<NextResponse> {
    try {
        const client: MongoClient = await clientPromise;
        const db: Db = client.db('sample_mflix'); // Replace with your actual database
        const theaters = await db.collection('theaters').find({}).limit(10).toArray(); // Adjust collection name as needed

        return NextResponse.json(
            { status: 200, data: theaters }
        );
    }
    catch (error: any) {
        return NextResponse.json(
            { status: 500, message: 'Internal Server Error', error: error.message }
        );
    }
}

/**
 * @swagger
 * /api/theaters:
 *   post:
 *     description: Method Not Allowed
 *     responses:
 *       405:
 *         description: POST method is not supported
 */
export async function POST(): Promise<NextResponse> {
    return NextResponse.json({ status: 405, message: 'Method Not Allowed', error: 'POST method is not supported' });
}

/**
 * @swagger
 * /api/theaters:
 *   put:
 *     description: Method Not Allowed
 *     responses:
 *       405:
 *         description: PUT method is not supported
 */
export async function PUT(): Promise<NextResponse> {
    return NextResponse.json({ status: 405, message: 'Method Not Allowed', error: 'PUT method is not supported' });
}

/**
 * @swagger
 * /api/theaters:
 *   delete:
 *     description: Method Not Allowed
 *     responses:
 *       405:
 *         description: DELETE method is not supported
 */
export async function DELETE(): Promise<NextResponse> {
    return NextResponse.json({ status: 405, message: 'Method Not Allowed', error: 'DELETE method is not supported' });
}
