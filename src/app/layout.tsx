import './globals.css'
import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Test',
  description: 'Test',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='min-h-screen flex flex-col relative'>
        <header className='p-2 text-xl'>
            Tlak?
        </header>
        <div className='min-h-fit h-full w-full flex flex-grow'>
          <div className='w-40 hidden'>
            a
          </div>
          <main className='w-full bg-white'>
            {children}
          </main>
        </div>
        <footer className='p-2'>
          By <a href='https://github.com/ondrejkno2p'>knoppo</a>
        </footer>
      </body>
    </html>
  )
}
// flex min-h-screen flex-col items-center justify-between p-24