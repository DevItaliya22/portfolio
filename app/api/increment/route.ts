import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); 
    const idParam:string = body.id;
    const inc = await prisma.views.update({
      where: { project: idParam },
      data: { views: { increment: 1 } },
    });

    return NextResponse.json({ inc });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
