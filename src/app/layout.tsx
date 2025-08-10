// src/app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'

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
        <script 
          type="module" 
          src="https://unpkg.com/@splinetool/viewer@1.0.52/build/spline-viewer.js"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}