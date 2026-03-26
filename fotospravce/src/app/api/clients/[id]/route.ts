import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireUser } from '@/lib/session';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await requireUser();
  const data = await req.json();
  const client = await prisma.client.update({
    where: { id: params.id, userId: user.id },
    data,
  });
  return NextResponse.json(client);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const user = await requireUser();
  await prisma.client.delete({ where: { id: params.id, userId: user.id } });
  return NextResponse.json({ ok: true });
}
