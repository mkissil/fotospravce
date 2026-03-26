import { getServerSession } from 'next-auth';
import { UnauthorizedError } from './api';
import { authOptions } from './auth';
import { normalizeEmail, prisma, withDbRetry } from './db';

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;
  const email = session.user.email;

  return withDbRetry(() =>
    prisma.user.findUnique({
      where: { email: normalizeEmail(email) },
    })
  );
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) throw new UnauthorizedError();
  return user;
}
