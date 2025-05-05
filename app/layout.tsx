import type React from "react"
import "@/app/globals.css"
import { Mona_Sans as FontSans } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"
import { DashboardLayout } from "@/components/dashboard-layout"
import { cn } from "@/lib/utils"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: "Road Nomenclature & Infra Monitoring Dashboard",
  description: "ADC Mahendragarh Road Infrastructure Management System",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <DashboardLayout>{children}</DashboardLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
