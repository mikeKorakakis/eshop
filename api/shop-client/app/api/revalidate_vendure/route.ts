import { NextApiRequest, NextApiResponse } from 'next';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest){
  // Check for secret to confirm this is a valid request
  const secret = req.nextUrl.searchParams.get('secret');
  if (secret !== process.env.VENDURE_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    await revalidateTag('order');
    return NextResponse.json({ message: 'Revalidation successful' }, { status: 200 });
  } catch (err: unknown) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    if(err instanceof Error)
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
