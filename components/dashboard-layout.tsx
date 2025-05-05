"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileSpreadsheet, Home, Menu, RouteIcon as Road, Search, Tag } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const NavItem = ({
  href,
  icon: Icon,
  title,
  isActive,
  onClick,
}: {
  href: string
  icon: React.ElementType
  title: string
  isActive: boolean
  onClick?: () => void
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-x-2 text-gray-500 p-2 rounded-md hover:bg-blue-50 hover:text-blue-700 transition-all",
        isActive && "bg-blue-50 text-blue-700 font-medium",
      )}
    >
      <Icon className="w-5 h-5" />
      <span>{title}</span>
    </Link>
  )
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  const navItems = [
    {
      href: "/dashboard",
      icon: Home,
      title: "Dashboard Overview",
    },
    {
      href: "/roads",
      icon: Road,
      title: "Road Registry",
    },
    {
      href: "/work-tagging",
      icon: Tag,
      title: "Work Tagging",
    },
    {
      href: "/search",
      icon: Search,
      title: "Search & Filter",
    },
    {
      href: "/export",
      icon: FileSpreadsheet,
      title: "Export Data",
    },
  ]

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="py-6 px-6 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-blue-700">ADC Mahendragarh</h1>
          <p className="text-xs text-gray-500 mt-1">Road Infrastructure Portal</p>
        </div>
        <nav className="flex-1 py-6 px-4 space-y-1">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              title={item.title}
              isActive={pathname === item.href}
            />
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-700 font-medium">AM</span>
            </div>
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-500">ADC Office</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-50">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <SheetHeader className="py-6 px-6 border-b border-gray-200">
            <SheetTitle className="text-xl font-semibold text-blue-700">ADC Mahendragarh</SheetTitle>
            <p className="text-xs text-gray-500 mt-1">Road Infrastructure Portal</p>
          </SheetHeader>
          <nav className="flex-1 py-6 px-4 space-y-1">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                title={item.title}
                isActive={pathname === item.href}
                onClick={() => setSidebarOpen(false)}
              />
            ))}
          </nav>
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-700 font-medium">AM</span>
              </div>
              <div>
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-gray-500">ADC Office</p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="container mx-auto py-6 px-4 md:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  )
}
