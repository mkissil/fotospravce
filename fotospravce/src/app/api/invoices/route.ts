import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireUser } from '@/lib/session';

export async function GET() {
  const user = await requireUser();
  const invoices = await prisma.invoice.findMany({
    where: { userId: user.id },
    include: { client: true, job: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(invoices);
}

export async function POST(req: NextRequest) {
  const user = await requireUser();
  const data = await req.json();

  const counter = await prisma.user.findUnique({ where: { id: user.id }, select: { id: true } });
  const count = await prisma.invoice.count({ where: { userId: user.id } });
  const num = count + 1;
  const invoiceNumber = `F${new Date().getFullYear()}-${String(num).padStart(3, '0')}`;

  const invoice = await prisma.invoice.create({
    data: {
      userId: user.id,
      clientId: data.clientId,
      jobId: data.jobId || null,
      invoiceNumber,
      dueDate: new Date(data.dueDate),
      status: 'draft',
      items: JSON.stringify(data.items || []),
      subtotal: data.subtotal || 0,
      vatAmount: data.vatAmount || 0,
      total: data.total || 0,
      variableSymbol: String(new Date().getFullYear()) + String(num).padStart(3, '0'),
    },
    include: { client: true },
  });
  return NextResponse.json(invoice);
}
