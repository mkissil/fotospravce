import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { handleApiError, parseOptionalDate, parseOptionalNumber } from '@/lib/api';
import { prisma } from '@/lib/db';
import { requireUser } from '@/lib/session';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireUser();
    const data = await req.json();
    const updateData: Prisma.JobUpdateInput = {};

    if (data.status !== undefined) updateData.status = data.status;
    if (data.title !== undefined) updateData.title = data.title;
    if (data.type !== undefined) updateData.type = data.type;
    if (data.shootDate !== undefined) updateData.shootDate = parseOptionalDate(data.shootDate);
    if (data.location !== undefined) updateData.location = data.location;
    if (data.price !== undefined) updateData.price = parseOptionalNumber(data.price);
    if (data.deposit !== undefined) updateData.deposit = parseOptionalNumber(data.deposit);
    if (data.description !== undefined) updateData.description = data.description;
    if (data.clientId !== undefined) {
      updateData.client = {
        connect: {
          id: data.clientId,
        },
      };
    }

    const job = await prisma.job.update({
      where: { id: params.id, userId: user.id },
      data: updateData,
      include: { client: true },
    });
    return NextResponse.json(job);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireUser();
    await prisma.job.delete({ where: { id: params.id, userId: user.id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
