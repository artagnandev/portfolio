import type { Metadata } from 'next'
import { Inter, Sora } from 'next/font/google'

import "@/styles/main.scss"

const sora = Sora({
  weight: ["300", "400", "500", "700", "800"],
  subsets: ["latin"],
  variable: "--font-sora",
})

const inter = Inter({
  weight: ["300", "400", "500", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: 'David Artagnan - Front-end Dev',
  description: 'Portfólio de desenvolvedor fron-end.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={`${sora.variable} ${inter.variable} bg-black text-white font-sans`}>
        {children}
      </body>
    </html>
  )
}
