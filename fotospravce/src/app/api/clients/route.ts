import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireUser } from '@/lib/session';

export async function GET() {
  const user = await requireUser();
  const clients = await prisma.client.findMany({
    where: { userId: user.id },
    include: { _count: { select: { jobs: true, invoices: true } } },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(clients);
}

export async function POST(req: NextRequest) {
  const user = await requireUser();
  const data = await req.json();
  const client = await prisma.client.create({
    data: { userId: user.id, ...data },
  });
  return NextResponse.json(client);
}
