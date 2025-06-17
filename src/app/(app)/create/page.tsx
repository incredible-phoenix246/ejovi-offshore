'use client'

import { useEffect, useTransition } from 'react'
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

import { toast } from 'sonner'
import { useRouter } from '@bprogress/next/app'
import { useRequisition } from '@/hooks/use-requisition'
import { Currency, UnitType } from '@prisma/client'
import { createRequisition } from '@/actions/requisition'
import { RequisitionForm } from '../_components/requisition/forms/requisition-form'
import { AddRequisitionItemDialog } from '../_components/requisition/forms/add-requisition-item-dialog'
import { getQueryClient } from '@/lib/get-query-client'

export default function CreateRequisitionPage() {
  const router = useRouter()
  const queryClient = getQueryClient()
  const {
    currentRequisition,
    setCurrentRequisition,
    removeItemFromCurrentRequisition,
    clearCurrentRequisition,
  } = useRequisition()

  const [isSubmitting, startTransition] = useTransition()

  useEffect(() => {
    setCurrentRequisition({
      date_request: new Date(),
      items: [],
    })
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

    startTransition(async () => {
      await createRequisition({
        description: currentRequisition.description,
        date_request: currentRequisition.date_request,
        department: currentRequisition.department as string,
        location: currentRequisition.location as string,
        fleet: currentRequisition.fleet as string,
        category: currentRequisition.category as string,
        items: currentRequisition.items.map((item) => ({
          ...item,
          unit_type: item.unit_type as UnitType,
          currency: item.currency as Currency,
          account_code: item.account_code as string,
        })),
      }).then((res) => {
        if (res.success) {
          toast.success('Requisition created successfully', {
            position: 'top-center',
            description: res.message,
          })
          clearCurrentRequisition()
          queryClient.invalidateQueries()
          router.push('/')
        } else {
          toast.error('Failed to create requisition', {
            position: 'top-center',
            description: res.message,
          })
        }
      })
    })
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
            <Table>
              <TableHeader>
                <TableRow className="font-jakarta rounded-t-xl bg-[#EBE9FE] hover:bg-[#EBE9FE]">
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
                {currentRequisition?.items &&
                currentRequisition.items.length > 0
                  ? currentRequisition.items.map((item, index) => (
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
                    ))
                  : null}
              </TableBody>
            </Table>

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
