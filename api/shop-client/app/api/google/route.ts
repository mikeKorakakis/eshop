import { cookies } from 'next/headers';
// import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server';
import { AUTH_TOKEN } from '@/lib/constants';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  if (!code) {
    return NextResponse.json({ message: 'Bad Request' }, { status: 500 });
  }

  const response = await fetch(process.env.NEXT_PUBLIC_VENDURE_SHOP_API_URL!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      query: `mutation Authenticate($token: String!) {
    authenticate(input: {
      google: { token: $token }
    }) {
        ...on CurrentUser {
            id
            identifier
        }
    }
    }`,
      variables: { token: code }
    })
  });
  const data = await response.json();
  if (data?.data?.authenticate) {
    const cookieStore = cookies();
    const redirect_url = cookieStore.get('redirect_url');
    const headers = new Headers();
    for (const [header, value] of Array.from(response.headers.entries())) {
      let newH: string | string[] = value;
      if (header === 'set-cookie') {
        newH = value.split(',').map((h) => h.trim());
        //   res.setHeader(header, newH)
        newH.forEach((h) => {
          headers.append(header, h);
        });
      }
      if (header === 'vendure-auth-token') {
        headers.append('set-cookie', AUTH_TOKEN + '=' + value as string);
      }
    }
    cookieStore.delete('redirect_url');
    return NextResponse.redirect(redirect_url?.value || '/', {
      headers
    });
  } else {
    return NextResponse.json({ message: data.errors[0].message }, { status: 500 });
  }
}
