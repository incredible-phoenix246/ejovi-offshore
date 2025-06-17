import { Card, CardContent } from '@/components/ui/card'

interface StatsCardProps {
  title: string
  value: string
  className?: string
}

function StatsCard({ title, value, className }: StatsCardProps) {
  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="space-y-2">
          <p className="font-jakarta text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export function StatsCards() {
  return (
    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard title="Total Completed Requests" value="12,612" />
      <StatsCard title="Total Pending Requests" value="12" />
      <StatsCard title="Total Rejected Requests" value="12" />
      <StatsCard
        title="Total Estimate of Current Requests"
        value="$12,612,842"
      />
    </div>
  )
}
