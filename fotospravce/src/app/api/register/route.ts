import { Prisma } from '@prisma/client';
import { hash } from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { normalizeEmail, prisma, withDbRetry } from '@/lib/db';

const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .max(80, 'Jméno je příliš dlouhé')
    .optional()
    .or(z.literal(''))
    .transform(value => {
      const trimmed = value?.trim();
      return trimmed ? trimmed : null;
    }),
  email: z.string().trim().email('Zadejte platný e-mail').max(254).transform(normalizeEmail),
  password: z
    .string()
    .min(6, 'Heslo musí mít alespoň 6 znaků')
    .max(72, 'Heslo je příliš dlouhé'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      return NextResponse.json({ error: issue?.message || 'Neplatná registrační data' }, { status: 400 });
    }

    const { name, email, password } = parsed.data;
    const existing = await withDbRetry(() => prisma.user.findUnique({ where: { email } }));

    if (existing) {
      return NextResponse.json({ error: 'Účet s tímto e-mailem už existuje' }, { status: 400 });
    }

    const passwordHash = await hash(password, 10);
    const user = await withDbRetry(() =>
      prisma.user.create({
        data: {
          name,
          email,
          password: passwordHash,
        },
      })
    );

    return NextResponse.json({ id: user.id, email: user.email });
  } catch (error) {
    console.error('Register route failed', error);

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return NextResponse.json({ error: 'Účet s tímto e-mailem už existuje' }, { status: 400 });
    }

    return NextResponse.json(
      { error: 'Registrace se teď nepodařila. Zkuste to prosím znovu za pár vteřin.' },
      { status: 500 }
    );
  }
}
