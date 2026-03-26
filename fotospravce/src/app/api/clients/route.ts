import { NextRequest, NextResponse } from 'next/server';
import { handleApiError } from '@/lib/api';
import { prisma } from '@/lib/db';
import { requireUser } from '@/lib/session';

export async function GET() {
  try {
    const user = await requireUser();
    const clients = await prisma.client.findMany({
      where: { userId: user.id },
      include: { _count: { select: { jobs: true, invoices: true } } },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(clients);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    const data = await req.json();
    const client = await prisma.client.create({
      data: { userId: user.id, ...data },
    });
    return NextResponse.json(client);
  } catch (error) {
    return handleApiError(error);
  }
}
