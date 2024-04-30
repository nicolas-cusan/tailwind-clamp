import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Tailwind CSS clamp plugin demo',
  description:
    'A Tailwind CSS plugin that allows you to easily use the CSS clamp() function in your designs.',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="text-base bg-stone-100 text-stone-900 antialiased"
    >
      <body className={inter.className}>{children}</body>
    </html>
  );
}
