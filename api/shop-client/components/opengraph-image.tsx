import { ImageResponse } from 'next/og';
import http from 'http';
const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL
  ? process.env.NEXT_PUBLIC_FRONTEND_URL
  : 'http://localhost:8000';

export type Props = {
  title?: string;
};

async function getFont(): Promise<Buffer> {
  const url = process.env.APP_URL;
  return new Promise((resolve, reject) => {
    http
      .get(`${url}/Inter-Bold.ttf`, (res) => {
        const chunks: any[] = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => resolve(Buffer.concat(chunks)));
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}

export default async function OpengraphImage(props?: Props): Promise<ImageResponse> {
  const { title } = {
    ...{
      title: process.env.SITE_NAME
    },
    ...props
  };

  const interBold = async () => {
    const res = await fetch(new URL('./Inter-Bold.ttf', 'http://localhost:8000'));
    const inter = await res.arrayBuffer();
    return inter;
  };

  const getFont = async () => {
    const res = await fetch(`${baseUrl}/api/og`);
    const inter = await res.arrayBuffer();
    return inter;
  };

  return new ImageResponse(
    (
      <div tw="flex h-full w-full flex-col items-center justify-center bg-black">
        <div tw="flex flex-none items-center justify-center border border-neutral-700 h-[160px] w-[160px] rounded-3xl">
          <img
            src={new URL('./icon-512x512.png', baseUrl).href}
            alt={`${process.env.SITE_NAME} logo`}
            width={500}
            height={500}
          />
        </div>
        <p tw="mt-12 text-6xl font-bold text-white">{title}</p>
      </div>
    ),
    {
      width: 500,
      height: 500,
      fonts: [
        {
          name: 'Inter',
          data: await interBold(),
          style: 'normal',
          weight: 700
        }
      ]
    }
  );
}
