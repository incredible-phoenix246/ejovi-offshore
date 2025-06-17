'use client'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'
import { useRequisitionStatsQuery } from '@/queries'

interface StatsCardProps {
  title: string
  value: string
  className?: string
  isLoading?: boolean
}

function StatsCard({ title, value, className, isLoading }: StatsCardProps) {
  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="space-y-2">
          <p className="font-jakarta text-sm text-gray-600">{title}</p>
          {isLoading ? (
            <Skeleton className="h-8 w-24" />
          ) : (
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export function StatsCards() {
  const { data, isLoading, error } = useRequisitionStatsQuery()

  if (isLoading) {
    return (
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Completed Requests" value="" isLoading={true} />
        <StatsCard title="Total Pending Requests" value="" isLoading={true} />
        <StatsCard title="Total Rejected Requests" value="" isLoading={true} />
        <StatsCard
          title="Total Estimate of Current Requests"
          value=""
          isLoading={true}
        />
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center text-red-600">
              <span className="text-sm">Error loading stats</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Format the total estimate as currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Format regular numbers with commas
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num)
  }

  return (
    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Completed Requests"
        value={formatNumber(data?.totalCompleted || 0)}
      />
      <StatsCard
        title="Total Pending Requests"
        value={formatNumber(data?.totalPending || 0)}
      />
      <StatsCard
        title="Total Rejected Requests"
        value={formatNumber(data?.totalRejected || 0)}
      />
      <StatsCard
        title="Total Estimate of Current Requests"
        value={formatCurrency(data?.totalEstimate || 0)}
      />
    </div>
  )
}
