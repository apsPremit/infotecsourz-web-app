import './globals.css';
import { Poppins } from 'next/font/google';
import NextAuthProvider from '@/context/NextAuthProvider';
import { AuthProvider } from '@/context/AuthProvider';
import TanStackProvider from '@/context/TanstackProvider';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600'],
});
export const metadata = {
  title: 'Virtual Photo Retouching Service for Business - Infotecsourz',
  description:
    'Virtual photo retouching service partner that you get from home. Our best product retouching &amp; model photo editing services are pixel perfect',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={poppins.className}>
        <NextAuthProvider>
          <TanStackProvider>
            <AuthProvider>
              <main className='mx-auto max-w-screen-2xl'>{children}</main>
            </AuthProvider>
          </TanStackProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
