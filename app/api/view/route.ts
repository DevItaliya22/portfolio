import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const view = await prisma.views.findMany();
    console.log(view)
    return NextResponse.json({view})
  } catch (error) {
    console.error('Error fetching views:', error);
    return NextResponse.json({ error: 'Failed to fetch views' }, { status: 500 });
  }
}
