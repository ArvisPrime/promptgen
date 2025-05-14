import './globals.css';

export const metadata = {
  title: 'Prompt Gen',
  description: 'Transform rough ideas into well-structured prompts for AI models'
};

import { ReactQueryProvider } from '@/components/ReactQueryProvider';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}