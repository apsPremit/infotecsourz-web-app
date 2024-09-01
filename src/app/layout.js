import './globals.css';
import { Poppins } from 'next/font/google';
import NextAuthProvider from '@/context/NextAuthProvider';
import { AuthProvider } from '@/context/AuthProvider';
import TanStackProvider from '@/context/TanstackProvider';
import ReduxProvider from '@/context/ReduxProvider';

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
      <head>
        <link rel='icon' href='/public/logo.png' sizes='any' />
      </head>
      <body className={poppins.className}>
        <ReduxProvider>
          <NextAuthProvider>
            <TanStackProvider>
              <AuthProvider>
                <main
                  className='mx-auto relative'
                  style={{ maxWidth: '2000px' }}
                >
                  {children}
                </main>
              </AuthProvider>
            </TanStackProvider>
          </NextAuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
