import { useQuery } from '@tanstack/react-query'
import { getRequestationStats, getRequisitions } from '@/actions/requisition'

export const useRequisitionsQuery = (props: { page?: string, per_page?: string }) => {
    return useQuery({
        queryKey: ['requisitions', props.page, props.per_page],
        queryFn: async () => {
            const res = await getRequisitions(props.page ?? "1", props.per_page ?? "10")
            const data = {
                requisitions: res.requisitions,
                pagination: res.pagination
            }
            return data
        }
    })
}



export const useRequisitionStatsQuery = () => {
    return useQuery({
        queryKey: ['requisitions_stats'],
        queryFn: async () => {
            const res = await getRequestationStats()
            return res
        }
    })
}