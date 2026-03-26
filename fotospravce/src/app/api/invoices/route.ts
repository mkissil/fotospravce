import { NextRequest, NextResponse } from 'next/server';
import { handleApiError, parseOptionalNumber, parseRequiredDate } from '@/lib/api';
import { prisma } from '@/lib/db';
import { requireUser } from '@/lib/session';

export async function GET() {
  try {
    const user = await requireUser();
    const invoices = await prisma.invoice.findMany({
      where: { userId: user.id },
      include: { client: true, job: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(invoices);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    const data = await req.json();

    const count = await prisma.invoice.count({ where: { userId: user.id } });
    const num = count + 1;
    const invoiceNumber = `F${new Date().getFullYear()}-${String(num).padStart(3, '0')}`;

    const invoice = await prisma.invoice.create({
      data: {
        userId: user.id,
        clientId: data.clientId,
        jobId: data.jobId || null,
        invoiceNumber,
        dueDate: parseRequiredDate(data.dueDate, 'dueDate'),
        status: 'draft',
        items: JSON.stringify(Array.isArray(data.items) ? data.items : []),
        subtotal: parseOptionalNumber(data.subtotal) ?? 0,
        vatAmount: parseOptionalNumber(data.vatAmount) ?? 0,
        total: parseOptionalNumber(data.total) ?? 0,
        variableSymbol: String(new Date().getFullYear()) + String(num).padStart(3, '0'),
      },
      include: { client: true },
    });
    return NextResponse.json(invoice);
  } catch (error) {
    return handleApiError(error);
  }
}
