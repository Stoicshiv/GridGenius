import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Grid Genius",
  description: "AI-driven energy optimization for smart cities",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider defaultTheme="light" storageKey="grid-genius-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'