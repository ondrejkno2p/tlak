import './globals.css'
import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Tlak',
  description: 'Tlak ve vaší lokaci',
  icons: './icon.png'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='min-h-screen flex flex-col relative'>
        <header className='p-10 text-3xl border-b-2 border-solid border-black'>
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
        <footer className='p-6 text-xl border-t-2 border-solid border-black'>
          By <a href='https://github.com/ondrejkno2p' className=''>knoppo</a>
        </footer>
      </body>
    </html>
  )
}
// flex min-h-screen flex-col items-center justify-between p-24