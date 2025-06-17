'use client'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { MoreHorizontal, ArrowUpDown, Loader2 } from 'lucide-react'
import { useRequisitionsQuery } from '@/queries'
import { useState } from 'react'
import { format } from 'date-fns'

const getStatusColor = (status: string) => {
  switch (status) {
    case 'APPROVED':
      return 'bg-green-100 text-green-800'
    case 'IN_REVIEW':
      return 'bg-orange-100 text-orange-800'
    case 'REJECTED':
      return 'bg-red-100 text-red-800'
    case 'PENDING':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'APPROVED':
      return 'Approved'
    case 'IN_REVIEW':
      return 'In Review'
    case 'REJECTED':
      return 'Rejected'
    case 'PENDING':
      return 'Pending'
    default:
      return status
  }
}

export function RequisitionTable() {
  const [currentPage, setCurrentPage] = useState('1')
  const [perPage, setPerPage] = useState<'10' | '25' | '50'>('10')

  const { data, isLoading, error } = useRequisitionsQuery({
    per_page: perPage,
    page: currentPage,
  })

  if (isLoading) {
    return (
      <div className="rounded-lg border bg-white">
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading requisitions...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border bg-white">
        <div className="flex items-center justify-center p-8">
          <span className="text-red-600">Error loading requisitions</span>
        </div>
      </div>
    )
  }

  if (!data?.requisitions || data.requisitions.length === 0) {
    return (
      <div className="rounded-lg border bg-white">
        <div className="flex items-center justify-center p-8">
          <span className="text-gray-500">No requisitions found</span>
        </div>
      </div>
    )
  }

  const totalPages = data.pagination?.total_pages || 1
  const currentPageNum = Number.parseInt(currentPage)
  const totalRecords = data.pagination?.total || 0
  const startRecord = (currentPageNum - 1) * Number.parseInt(perPage) + 1
  const endRecord = Math.min(
    currentPageNum * Number.parseInt(perPage),
    totalRecords
  )

  return (
    <>
      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-medium text-gray-600">
                RFQ No.
              </TableHead>
              <TableHead className="font-medium text-gray-600">
                <div className="flex items-center space-x-1">
                  <span>Description</span>
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="font-medium text-gray-600">
                Category
              </TableHead>
              <TableHead className="font-medium text-gray-600">
                Department
              </TableHead>
              <TableHead className="font-medium text-gray-600">
                Vendor
              </TableHead>
              <TableHead className="font-medium text-gray-600">
                Estimated Cost
              </TableHead>
              <TableHead className="font-medium text-gray-600">
                Date Submitted
              </TableHead>
              <TableHead className="font-medium text-gray-600">
                Status
              </TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.requisitions.map((req) => {
              const totalCost =
                req.items?.reduce(
                  (sum, item) => sum + Number(item.estimated_cost || 0),
                  0
                ) || 0
              const primaryVendor = req.items?.[0]?.vendor || 'N/A'
              return (
                <TableRow key={req.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium text-gray-900">
                    EJV-RFQ {req.number}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {req.description}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {req.category}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {req.department}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {primaryVendor}
                  </TableCell>
                  <TableCell className="font-medium text-gray-900">
                    ₦
                    {totalCost
                      ? new Intl.NumberFormat().format(totalCost)
                      : 'TBD'}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {req.created_at instanceof Date
                      ? format(req.created_at, 'dd MMM yyyy')
                      : format(new Date(req.created_at), 'dd MMM yyyy')}
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(req.status)} border-0`}>
                      {getStatusLabel(req.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="p-1">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6 flex w-full flex-col items-center justify-center space-y-4 md:flex-row md:space-y-0 md:space-x-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Rows per page:</span>
            <Select
              value={perPage}
              onValueChange={(value: '10' | '25' | '50') => {
                setPerPage(value)
                setCurrentPage('1')
              }}
            >
              <SelectTrigger className="w-[8rem]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-sm text-gray-600">
            Showing {startRecord}-{endRecord} of {totalRecords} results
          </p>
        </div>

        {/* Prev/Next buttons */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) =>
                Math.max(1, Number.parseInt(prev) - 1).toString()
              )
            }
            disabled={currentPageNum <= 1}
          >
            Previous
          </Button>

          <span className="text-sm text-gray-600">
            Page {currentPageNum} of {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(totalPages, Number.parseInt(prev) + 1).toString()
              )
            }
            disabled={currentPageNum >= totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  )
}
