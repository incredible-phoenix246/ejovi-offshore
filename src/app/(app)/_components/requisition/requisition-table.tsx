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
import { MoreHorizontal, ArrowUpDown } from 'lucide-react'

const requisitions = [
  {
    rfqNo: 'EIV-RFQ1101',
    description: 'Diesel 500L',
    category: 'Fleet',
    asset: 'JV Inagha',
    department: 'Operations',
    vendor: 'IT Equipment',
    estimatedCost: '₦323,450,000',
    dateSubmitted: '22 Jan 2022',
    status: 'In Review',
    statusColor: 'bg-orange-100 text-orange-800',
  },
  {
    rfqNo: 'EIV-RFQ1102',
    description: 'Printer Cartridges',
    category: 'Fleet',
    asset: 'JV Antares',
    department: 'Admin',
    vendor: 'Office Supplies',
    estimatedCost: '₦12,000,000',
    dateSubmitted: '20 Jan 2022',
    status: 'Approved',
    statusColor: 'bg-green-100 text-green-800',
  },
  {
    rfqNo: 'EIV-RFQ1103',
    description: 'Safety Boots',
    category: 'Fleet',
    asset: 'Ned Stark',
    department: 'HSE',
    vendor: 'Shipping',
    estimatedCost: '₦375,000',
    dateSubmitted: '24 Jan 2022',
    status: 'Rejected',
    statusColor: 'bg-red-100 text-red-800',
  },
  {
    rfqNo: 'EIV-RFQ1104',
    description: 'Welding Rods',
    category: 'Office',
    asset: 'N/A',
    department: 'Maintenance',
    vendor: 'Printing Services',
    estimatedCost: '₦80,000',
    dateSubmitted: '26 Jan 2022',
    status: 'Approved',
    statusColor: 'bg-green-100 text-green-800',
  },
  {
    rfqNo: 'EIV-RFQ1105',
    description: 'Office Chairs',
    category: 'Fleet',
    asset: 'JV Inagha',
    department: 'Admin',
    vendor: 'Furniture',
    estimatedCost: '₦250,000',
    dateSubmitted: '18 Jan 2022',
    status: 'In Review',
    statusColor: 'bg-orange-100 text-orange-800',
  },
  {
    rfqNo: 'EIV-RFQ1106',
    description: 'Network Switch',
    category: 'Fleet',
    asset: 'JV 32',
    department: 'IT',
    vendor: 'Cleaning',
    estimatedCost: '₦180,000',
    dateSubmitted: '28 Jan 2022',
    status: 'Approved',
    statusColor: 'bg-green-100 text-green-800',
  },
  {
    rfqNo: 'EIV-RFQ1107',
    description: 'Raincoats',
    category: 'Office',
    asset: 'N/A',
    department: 'Logistics',
    vendor: 'Food Services',
    estimatedCost: '₦500,000',
    dateSubmitted: '16 Jan 2022',
    status: 'Rejected',
    statusColor: 'bg-red-100 text-red-800',
  },
  {
    rfqNo: 'EIV-RFQ1108',
    description: 'Fire Extinguishers',
    category: 'Fleet',
    asset: 'JV Inagha',
    department: 'HSE',
    vendor: '16 Jan 2022',
    estimatedCost: '₦2,000,000',
    dateSubmitted: '16 Jan 2022',
    status: 'In Review',
    statusColor: 'bg-orange-100 text-orange-800',
  },
]

export function RequisitionTable() {
  return (
    <div className="rounded-lg border bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-medium text-gray-600">RFQ No.</TableHead>
            <TableHead className="font-medium text-gray-600">
              <div className="flex items-center space-x-1">
                <span>Description</span>
                <ArrowUpDown className="h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="font-medium text-gray-600">
              Category
            </TableHead>
            <TableHead className="font-medium text-gray-600">Asset</TableHead>
            <TableHead className="font-medium text-gray-600">
              Department
            </TableHead>
            <TableHead className="font-medium text-gray-600">Vendor</TableHead>
            <TableHead className="font-medium text-gray-600">
              Estimated Cost
            </TableHead>
            <TableHead className="font-medium text-gray-600">
              Date Submitted
            </TableHead>
            <TableHead className="font-medium text-gray-600">Status</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requisitions.map((req) => (
            <TableRow key={req.rfqNo} className="hover:bg-gray-50">
              <TableCell className="font-medium text-gray-900">
                {req.rfqNo}
              </TableCell>
              <TableCell className="text-gray-600">{req.description}</TableCell>
              <TableCell className="text-gray-600">{req.category}</TableCell>
              <TableCell className="text-gray-600">{req.asset}</TableCell>
              <TableCell className="text-gray-600">{req.department}</TableCell>
              <TableCell className="text-gray-600">{req.vendor}</TableCell>
              <TableCell className="font-medium text-gray-900">
                {req.estimatedCost}
              </TableCell>
              <TableCell className="text-gray-600">
                {req.dateSubmitted}
              </TableCell>
              <TableCell>
                <Badge className={`${req.statusColor} border-0`}>
                  {req.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="sm" className="p-1">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
