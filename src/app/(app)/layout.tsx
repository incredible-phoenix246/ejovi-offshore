import type React from 'react'
import { Header } from './_components/header'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto min-h-screen max-w-[1500px] bg-gray-50">
      <div className="sticky top-0 z-50">
        <Header />
      </div>
      <main className="relative">{children}</main>
    </div>
  )
}
