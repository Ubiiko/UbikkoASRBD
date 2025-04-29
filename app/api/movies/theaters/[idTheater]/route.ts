/**
 * @swagger
 * /api/theaters/{idTheater}:
 *   get:
 *     summary: Récupérer un cinéma
 *     parameters:
 *       - name: idTheater
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Succès
 *       404:
 *         description: Cinéma non trouvé
 *   post:
 *     summary: Ajouter un cinéma
 *     responses:
 *       201:
 *         description: Créé
 *   put:
 *     summary: Modifier un cinéma
 *     responses:
 *       200:
 *         description: Modifié
 *       404:
 *         description: Non trouvé
 *   delete:
 *     summary: Supprimer un cinéma
 *     parameters:
 *       - name: idTheater
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Supprimé
 *       404:
 *         description: Non trouvé
 */
import { NextRequest, NextResponse } from 'next/server';
import { Db, MongoClient, ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

type Context = {
  params: {
    idTheater: string;
  }
}

export async function GET(request: NextRequest, { params }: Context): Promise<NextResponse> {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('sample_mflix');
    const { idTheater } = params;

    if (!ObjectId.isValid(idTheater)) {
      return NextResponse.json({ status: 400, message: 'Invalid theater ID' });
    }

    const theater = await db.collection('theaters').findOne({ _id: new ObjectId(idTheater) });

    if (!theater) {
      return NextResponse.json({ status: 404, message: 'Theater not found' });
    }

    return NextResponse.json({ status: 200, data: { theater } });
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
}

export async function POST(): Promise<NextResponse> {
  return NextResponse.json({ status: 405, message: 'POST method not supported for theaters' });
}

export async function PUT(): Promise<NextResponse> {
  return NextResponse.json({ status: 405, message: 'PUT method not implemented yet' });
}

export async function DELETE(request: NextRequest, { params }: Context): Promise<NextResponse> {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('sample_mflix');
    const { idTheater } = params;

    if (!ObjectId.isValid(idTheater)) {
      return NextResponse.json({ status: 400, message: 'Invalid theater ID' });
    }

    const result = await db.collection('theaters').deleteOne({ _id: new ObjectId(idTheater) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ status: 404, message: 'Theater not found' });
    }

    return NextResponse.json({ status: 200, message: 'Theater deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
}
