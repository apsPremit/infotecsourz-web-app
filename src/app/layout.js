import { AuthProvider } from '@/context/AuthProvider'

import './globals.css'
import { Poppins } from 'next/font/google'


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600'],
})
export const metadata = {

  title: 'InfotecSourz',
  description: 'Transform your business with digital branding.',

}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
          <main className='max-w-screen-2xl mx-auto'>
            {children}

          </main>

        </AuthProvider>
      </body>
    </html>
  )
}
