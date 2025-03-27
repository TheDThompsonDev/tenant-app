import type { Metadata } from 'next';
import '@/app/globals.css';
import { NotificationsProvider } from '@/context/NotificationsContext';

export const metadata: Metadata = {
  title: 'Tenant App',
  description: 'Application for managing tenant relationships',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <NotificationsProvider>
          {children}
        </NotificationsProvider>
      </body>
    </html>
  );
}
