import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireUser } from '@/lib/session';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await requireUser();
  const data = await req.json();
  const updateData: any = {};
  if (data.status !== undefined) updateData.status = data.status;
  if (data.title !== undefined) updateData.title = data.title;
  if (data.type !== undefined) updateData.type = data.type;
  if (data.shootDate !== undefined) updateData.shootDate = data.shootDate ? new Date(data.shootDate) : null;
  if (data.location !== undefined) updateData.location = data.location;
  if (data.price !== undefined) updateData.price = data.price ? parseFloat(data.price) : null;
  if (data.deposit !== undefined) updateData.deposit = data.deposit ? parseFloat(data.deposit) : null;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.clientId !== undefined) updateData.clientId = data.clientId;

  const job = await prisma.job.update({
    where: { id: params.id, userId: user.id },
    data: updateData,
    include: { client: true },
  });
  return NextResponse.json(job);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const user = await requireUser();
  await prisma.job.delete({ where: { id: params.id, userId: user.id } });
  return NextResponse.json({ ok: true });
}
