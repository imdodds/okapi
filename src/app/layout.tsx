import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'

export const metadata = {
  title: 'Okapi',
  description: 'An open-source Reddit clone built with Next.js and TypeScript.',
}

const inter = Inter({subsets: ['latin']})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={cn('bg-white text-slate-900 antialiased light', inter.className)}>
      <body className='min-h-screen p-12 bg-slate-50 antialiased'>{children}</body>
    </html>
  )
}
