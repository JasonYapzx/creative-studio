import { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local'


export const metadata: Metadata = {
  title: 'TiTo',
  description: 'TikTok&apos;s asset generator.',
}

const tiktok = localFont({
  src: [
    {
      path: '../../public/fonts/TikTokTextRegular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/TikTokTextBold.woff2',
      weight: '400',
      style: 'bold',
    },
    {
      path: '../../public/fonts/TikTokDisplayRegular.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/TikTokDisplayBold.woff2',
      weight: '700',
      style: 'bold',
    },
  ],
  variable: '--font-tiktok'
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${tiktok.variable} font-sans`}>{children}</body>
      </html>
  );
}
