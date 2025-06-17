'use client'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Search, Settings, Bell } from 'lucide-react'
import BlurImage from '@/components/miscellaneous/blur-image'
import { useState } from 'react'
import { useSearch } from '@/hooks/use-search'
import { useSession } from 'next-auth/react'

export function Header() {
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const { search, setSearch } = useSearch()
  const { data } = useSession()
  return (
    <header className="font-jakarta border-b bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <BlurImage src="/na.png" alt="Logo" width={48} height={48} />
            <div className="flex items-center">
              <BlurImage src="/logo.png" alt="Logo" width={125} height={48} />
              {/* na.png */}
            </div>
          </div>

          <nav className="hidden items-center space-x-6 md:flex">
            <Button
              variant="ghost"
              className="cursor-not-allowed text-gray-400"
              disabled
            >
              Dashboard
            </Button>
            <Button variant="ghost" className="bg-purple-50 text-purple-600">
              Requisition
            </Button>
            <Button
              variant="ghost"
              className="cursor-not-allowed text-gray-400"
              disabled
            >
              Vendors
            </Button>
            <Button
              variant="ghost"
              className="cursor-not-allowed text-gray-400"
              disabled
            >
              Quotes
            </Button>
            <Button
              variant="ghost"
              className="cursor-not-allowed text-gray-400"
              disabled
            >
              Schedule
            </Button>
            <Button
              variant="ghost"
              className="cursor-not-allowed text-gray-400"
              disabled
            >
              Purchase Order
            </Button>
            <Button
              variant="ghost"
              className="cursor-not-allowed text-gray-400"
              disabled
            >
              Analytics
            </Button>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <motion.div
            initial={{ width: '200px' }}
            animate={{ width: isSearchFocused ? '300px' : '200px' }}
            className="relative mr-4"
          >
            <Search
              size={18}
              className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400"
            />
            <Input
              type="text"
              placeholder="Search anything..."
              className="w-full rounded-full bg-gray-100 py-2 pr-4 pl-10 transition-all"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </motion.div>
          <Button variant="ghost" size="sm" className="p-2">
            <Settings className="h-4 w-4 text-gray-600" />
          </Button>
          <Button variant="ghost" size="sm" className="p-2">
            <Bell className="h-4 w-4 text-gray-600" />
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>
              {data?.user?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
