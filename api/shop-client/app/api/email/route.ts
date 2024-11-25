import { sendinblue } from '@/lib/sendingblue';
// import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const sendSmtpEmail = {
      to: [
        {
          email: process.env.EMAIL_RECIPIENT
        }
      ],
      templateId: 1,
      params: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        message: body.message
      }
    };
    sendinblue(sendSmtpEmail);

    return NextResponse.json({ message: 'Operation successful' }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
