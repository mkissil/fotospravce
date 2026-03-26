import { NextRequest, NextResponse } from 'next/server';
import { lookupIco } from '@/lib/ares';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const ico = request.nextUrl.searchParams.get('ico');
    if (!ico) {
      return NextResponse.json({ error: 'Missing ico parameter' }, { status: 400 });
    }

    const result = await lookupIco(ico);
    if (!result) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'ARES lookup failed' }, { status: 502 });
  }
}
