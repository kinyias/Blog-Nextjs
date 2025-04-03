import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import QueryProvider from '@/context/query-provider';
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
const beVietnamPro = localFont({
  src: [
    {
      path: './fonts/BeVietnamPro-Bold.ttf',
      weight: '700',
    },
    {
      path: './fonts/BeVietnamPro-Medium.ttf',
      weight: '500',
    },
    {
      path: './fonts/BeVietnamPro-Regular.ttf',
      weight: '400',
    },
  ],
});

export const metadata: Metadata = {
  title: 'Blog nhóm 17',
  description: 'Đồ án thực tập tốt nghiệp',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${beVietnamPro.className} antialiased`}>
      <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
      <QueryProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
