// filename: app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portfolio - Software Developer',
  description: 'Interactive terminal-based portfolio showcasing my skills, projects, and experience as a software developer.',
  keywords: 'portfolio, software developer, full stack, react, nextjs, javascript, typescript',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/js-dos@6.22/dist/js-dos.css"
        />
      </head>
      <body className={inter.className}>
        <Script
          src="https://unpkg.com/js-dos@6.22.48/dist/js-dos.js"
          strategy="beforeInteractive"
        />
        {children}
      </body>
    </html>
  )
}