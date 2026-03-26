import { NextRequest, NextResponse } from 'next/server';
import { handleApiError } from '@/lib/api';
import { prisma } from '@/lib/db';
import { requireUser } from '@/lib/session';

export async function PUT(req: NextRequest) {
  try {
    const user = await requireUser();
    const data = await req.json();
    const updated = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: data.name,
        phone: data.phone,
        businessName: data.businessName,
        ico: data.ico,
        dic: data.dic,
        address: data.address,
        vatPayer: data.vatPayer,
      },
    });
    return NextResponse.json(updated);
  } catch (error) {
    return handleApiError(error);
  }
}
