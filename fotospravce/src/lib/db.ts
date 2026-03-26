import { Prisma, PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

const RETRYABLE_PRISMA_CODES = new Set(['P1001', 'P1002', 'P1008', 'P1017']);
const RETRYABLE_MESSAGE_SNIPPETS = [
  "can't reach database server",
  'timed out',
  'timeout',
  'connection reset',
  'connection terminated',
  'socket hang up',
  'econnreset',
];

function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export function isRetryableDbError(error: unknown) {
  if (error instanceof Prisma.PrismaClientInitializationError) return true;
  if (error instanceof Prisma.PrismaClientUnknownRequestError) return true;

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return RETRYABLE_PRISMA_CODES.has(error.code);
  }

  const message = error instanceof Error ? error.message.toLowerCase() : '';
  return RETRYABLE_MESSAGE_SNIPPETS.some(snippet => message.includes(snippet));
}

export async function withDbRetry<T>(operation: () => Promise<T>, retries: number = 1) {
  let attempt = 0;

  while (true) {
    try {
      return await operation();
    } catch (error) {
      if (attempt >= retries || !isRetryableDbError(error)) {
        throw error;
      }

      attempt += 1;
      console.warn(`Retrying Prisma operation after transient database error (${attempt}/${retries})`, error);
      await wait(250 * attempt);
    }
  }
}
