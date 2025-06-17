'use server'

import { auth } from '@/auth'
import {
    RequisitionFormData,
    RequisitionItemFormData,
} from '@/schemas/requisition'
import { create_requisition, get_all_requisitions, get_requisitions } from '@/services/requisition'
import { revalidatePath } from 'next/cache'

export async function createRequisition(
    data: RequisitionFormData & { items: RequisitionItemFormData[] }
) {
    const session = await auth()

    if (!session || !session?.user) {
        return {
            success: false,
            message: 'You must be logged in to create a requisition',
        }
    }
    const userId = session.user.id as string

    return await create_requisition({
        ...data,
        user_id: userId,
    })
        .then((res) => {
            revalidatePath("/requisitions")
            return {
                success: true,
                message: 'Requisition created successfully',
                requisitionId: res.id,
            }
        })
        .catch((error) => {
            console.error('Error creating requisition:', error)
            return {
                success: false,
                message: error.message || 'Failed to create requisition',
            }
        })
}


export async function getRequisitions(page: string, per_page: string) {
    const requisitions = await get_all_requisitions(parseInt(page), parseInt(per_page))
    if (!requisitions) {
        return {
            success: false,
            message: 'No requisitions found',
            requisitions: [],
        }
    }
    return {
        success: true,
        message: 'Requisitions retrieved successfully',
        requisitions: requisitions.data.map(requisition => ({
            ...requisition,
            number: requisition.number.toString(),
            items: requisition.items.map(item => ({
                ...item,
                estimated_cost: item.estimated_cost.toString(),
                unit_price: item.unit_price.toString(),
            })),
        })),
        pagination: {
            page: requisitions.page,
            page_size: requisitions.page_size,
            total: requisitions.total,
            total_pages: requisitions.total_pages,

        }

    }
}


export async function getRequestationStats() {
    const requisitions = await get_requisitions()
    const stats = {
        totalCompleted: requisitions.filter((r) => r.status === "COMPLETED").length,
        totalPending: requisitions.filter((r) => r.status === "PENDING").length,
        totalRejected: requisitions.filter((r) => r.status === "REJECTED").length,
        totalEstimate: requisitions.reduce((sum, r) => {
            const itemsTotal = r.items?.reduce((itemSum, item) => itemSum + Number(item.estimated_cost || 0), 0) || 0
            return sum + itemsTotal
        }, 0),
    }
    return {
        ...stats
    }
}