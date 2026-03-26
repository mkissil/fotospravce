import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireUser } from '@/lib/session';

export async function GET() {
  const user = await requireUser();
  const jobs = await prisma.job.findMany({
    where: { userId: user.id },
    include: { client: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(jobs);
}

export async function POST(req: NextRequest) {
  const user = await requireUser();
  const data = await req.json();
  const job = await prisma.job.create({
    data: {
      userId: user.id,
      clientId: data.clientId,
      title: data.title,
      type: data.type || 'jine',
      status: data.status || 'poptavka',
      shootDate: data.shootDate ? new Date(data.shootDate) : null,
      location: data.location || null,
      price: data.price ? parseFloat(data.price) : null,
      deposit: data.deposit ? parseFloat(data.deposit) : null,
      description: data.description || null,
    },
    include: { client: true },
  });
  return NextResponse.json(job);
}
