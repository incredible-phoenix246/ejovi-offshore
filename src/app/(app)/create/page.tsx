'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ArrowLeft, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// import { useRequisitionStore } from '@/lib/stores/requisition-store'
// import { createRequisition } from '@/lib/actions/requisition'
import { toast } from 'sonner'
import { useRequisition } from '@/hooks/use-requisition'
import { RequisitionForm } from '../_components/requisition/forms/requisition-form'
import { AddRequisitionItemDialog } from '../_components/requisition/forms/add-requisition-item-dialog'

export default function CreateRequisitionPage() {
  const router = useRouter()
  const {
    currentRequisition,
    setCurrentRequisition,
    removeItemFromCurrentRequisition,
    clearCurrentRequisition,
    isSubmitting,
    setSubmitting,
  } = useRequisition()

  useEffect(() => {
    // Initialize a new requisition
    setCurrentRequisition({
      date_request: new Date(),
      items: [],
    })

    // Cleanup on unmount
    return () => {
      clearCurrentRequisition()
    }
  }, [setCurrentRequisition, clearCurrentRequisition])

  const handleSubmit = async () => {
    if (!currentRequisition) return

    if (currentRequisition.items.length === 0) {
      toast.error('Please add at least one item to the requisition')
      return
    }

    if (
      !currentRequisition.department ||
      !currentRequisition.location ||
      !currentRequisition.fleet ||
      !currentRequisition.category
    ) {
      toast.error('Please fill in all required fields')
      return
    }

    setSubmitting(true)
    // try {
    //   const result = await createRequisition({
    //     description: currentRequisition.description,
    //     date_request: currentRequisition.date_request,
    //     department: currentRequisition.department,
    //     location: currentRequisition.location,
    //     fleet: currentRequisition.fleet,
    //     category: currentRequisition.category,
    //     items: currentRequisition.items,
    //   })

    //   if (result.success) {
    //     toast.success('Requisition created successfully')
    //     clearCurrentRequisition()
    //     router.push('/requisitions')
    //   } else {
    //     toast.error(result.error || 'Failed to create requisition')
    //   }
    // } catch (error) {
    //   toast.error('An unexpected error occurred')
    // } finally {
    //   setSubmitting(false)
    // }
  }

  const totalEstimatedCost =
    currentRequisition?.items.reduce(
      (sum, item) => sum + item.estimated_cost,
      0
    ) || 0

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Return to Requisitions
          </Button>
        </Link>
      </div>

      <RequisitionForm />

      <Card>
        <CardHeader>
          <CardTitle>Requisition Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentRequisition?.items &&
            currentRequisition.items.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow className="bg-purple-50">
                    <TableHead>Item or Service</TableHead>
                    <TableHead>Account Code</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>QTY</TableHead>
                    <TableHead>Unit Price</TableHead>
                    <TableHead>Currency</TableHead>
                    <TableHead>Estimated Cost</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentRequisition.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.item_service}</TableCell>
                      <TableCell>{item.account_code}</TableCell>
                      <TableCell>{item.vendor || 'N/A'}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        {Number(item.unit_price).toLocaleString()}
                      </TableCell>
                      <TableCell>{item.currency}</TableCell>
                      <TableCell>
                        {Number(item.estimated_cost).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            removeItemFromCurrentRequisition(index)
                          }
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="py-8 text-center text-gray-500">
                No items added yet. Click "Add New Item" to get started.
              </div>
            )}

            <AddRequisitionItemDialog />

            <div className="flex items-center justify-between border-t pt-4">
              <span className="text-lg font-semibold">
                Total Estimated Cost:
              </span>
              <span className="text-lg font-semibold">
                {totalEstimatedCost.toLocaleString()} NGN
              </span>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !currentRequisition?.items.length}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
