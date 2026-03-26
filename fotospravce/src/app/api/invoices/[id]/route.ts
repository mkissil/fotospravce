import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireUser } from '@/lib/session';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await requireUser();
  const data = await req.json();
  const invoice = await prisma.invoice.update({
    where: { id: params.id, userId: user.id },
    data,
  });
  return NextResponse.json(invoice);
}
