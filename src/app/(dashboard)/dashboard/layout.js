import '../../globals.css';
import { Poppins } from 'next/font/google';
import NextAuthProvider from '@/context/NextAuthProvider';
import { AuthProvider } from '@/context/AuthProvider';
import TanStackProvider from '@/context/TanstackProvider';
import StateProvider from '@/context/StateProvider';
import Sidebar from '@/components/dashboard/Sidebar/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader/DashboardHeader';

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
              <StateProvider>
                <div className='grid grid-cols-12 gap-5  mx-auto'>
                  <div className='col-span-12 lg:col-span-2'>
                    <Sidebar />
                  </div>
                  <div className='w-full mx-auto bg-dashboard_background col-span-12 lg:col-span-10'>
                    <div className='bg-white px-5 border-b'>
                      <DashboardHeader />
                    </div>
                    <div className='px-5 max-w-[1300px] mx-auto '>
                      {children}
                    </div>
                  </div>
                </div>
              </StateProvider>
            </AuthProvider>
          </TanStackProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
