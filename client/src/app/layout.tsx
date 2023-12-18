import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import clsx from 'clsx'
import './globals.css'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { UserProvider } from '@/contexts/UserContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Google Search Data Scraper Web Application',
  description: 'Web scraping Using Node.js and Next.js with TypeScript',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className={clsx('h-full', inter.className, 'bg-white')}>
        <UserProvider>
          {children}
          <ToastContainer />
        </UserProvider>
      </body>
    </html>
  )
}
