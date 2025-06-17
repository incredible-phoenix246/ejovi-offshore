import React from 'react'
import { StatsCards } from './_components/requisition/stats-cards'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Filter } from 'lucide-react'
import { RequisitionTable } from './_components/requisition/requisition-table'
import Link from 'next/link'

const HomePage = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">Requisition</h1>
        <p className="font-jakarta text-gray-600">
          Manage all your requisition here.
        </p>
      </div>
      <StatsCards />
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <Input placeholder="Search" className="w-80 bg-white pl-10" />
          </div>
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
        </div>
        <Button
          className="bg-purple-600 py-2 text-white hover:bg-purple-700"
          asChild
        >
          <Link href="/create">Create Requisition</Link>
        </Button>
      </div>
      <RequisitionTable />
    </div>
  )
}

export default HomePage
