'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
  requisitionItemSchema,
  type RequisitionItemFormData,
  accountCodeOptions,
  currencyOptions,
} from '@/schemas/requisition'
import { useRequisition } from '@/hooks/use-requisition'
import BlurImage from '@/components/miscellaneous/blur-image'
import Image from 'next/image'
import { Currency, UnitType } from '@prisma/client'

export function AddRequisitionItemDialog() {
  const [open, setOpen] = useState(false)
  const { addItemToCurrentRequisition } = useRequisition()

  const form = useForm<RequisitionItemFormData>({
    resolver: zodResolver(requisitionItemSchema),
    defaultValues: {
      item_service: '',
      quantity: 1,
      unit_type: UnitType.EACH,
      unit_price: 0,
      currency: Currency.NGN,
      notes: '',
      vendor: '',
      account_code: '',
    },
  })

  const watchedQuantity = form.watch('quantity')
  const watchedUnitPrice = form.watch('unit_price')
  const watchedCurrency = form.watch('currency')
  const totalEstimatedCost = watchedQuantity * watchedUnitPrice

  const onSubmit = (data: RequisitionItemFormData) => {
    const itemWithCost = {
      ...data,
      estimated_cost: data.quantity * data.unit_price,
    }
    addItemToCurrentRequisition(itemWithCost)
    form.reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add New Item</Button>
      </DialogTrigger>
      <DialogContent className="font-nunito w-full sm:max-w-xl">
        <DialogHeader>
          <BlurImage
            src="/icon.png"
            alt="Requisition Icon"
            width={48}
            height={48}
          />
          <DialogTitle className="font-jakarta font-bold">
            Add New Requisition
          </DialogTitle>
          <DialogDescription>
            Use this page to request items or services your department needs.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="item_service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item or Service</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter item or service name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="vendor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Vendor (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter item or service name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="account_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Code</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[250px]">
                          <SelectValue placeholder="Select Account Code" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {accountCodeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number.parseInt(e.target.value) || 1)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unit_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[250px]">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(UnitType).map((value) => (
                          <SelectItem key={value} value={value}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled
                    >
                      <FormControl>
                        <SelectTrigger className="w-[250px]">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(Currency).map((value) => (
                          <SelectItem key={value} value={value}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unit_price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="3,000.00"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number.parseFloat(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="text-right">
              <span className="text-sm text-gray-600">
                Total Estimated Cost:{' '}
              </span>
              <span className="font-semibold text-purple-600">
                {totalEstimatedCost.toLocaleString()} {watchedCurrency}
              </span>
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="This items are need urgently needed. It's Antares we need it before the upcoming hire inspection."
                      rows={3}
                      {...field}
                      className="h-[100px] resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Image
              src="/file.png"
              alt="File Icon"
              width={518}
              height={152}
              className="mb-2"
              draggable={false}
            />

            <DialogFooter className="flex">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="w-full max-w-[253px]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-full max-w-[253px] bg-purple-600 hover:bg-purple-700"
              >
                Add Item
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
