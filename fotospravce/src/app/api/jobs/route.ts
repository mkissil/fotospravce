import { NextRequest, NextResponse } from 'next/server';
import { handleApiError, parseOptionalDate, parseOptionalNumber } from '@/lib/api';
import { prisma } from '@/lib/db';
import { requireUser } from '@/lib/session';

export async function GET() {
  try {
    const user = await requireUser();
    const jobs = await prisma.job.findMany({
      where: { userId: user.id },
      include: { client: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(jobs);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    const data = await req.json();
    const job = await prisma.job.create({
      data: {
        userId: user.id,
        clientId: data.clientId,
        title: data.title,
        type: data.type || 'jine',
        status: data.status || 'poptavka',
        shootDate: parseOptionalDate(data.shootDate),
        location: data.location || null,
        price: parseOptionalNumber(data.price),
        deposit: parseOptionalNumber(data.deposit),
        description: data.description || null,
      },
      include: { client: true },
    });
    return NextResponse.json(job);
  } catch (error) {
    return handleApiError(error);
  }
}
