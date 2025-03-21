import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import QueryProvider from '@/context/query-provider';
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
