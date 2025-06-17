import prisma from '@/lib/primsa'
import {
  RequisitionFormData,
  RequisitionItemFormData,
} from '@/schemas/requisition'

export async function create_requisition(
  data: RequisitionFormData & {
    items: RequisitionItemFormData[]
    user_id: string
  }
) {
  return prisma.requisition.create({
    data: {
      description: data.description,
      date_request: data.date_request,
      department: data.department,
      location: data.location,
      fleet: data.fleet,
      category: data.category,
      user_id: data.user_id,
      items: {
        create: data.items.map((item) => ({
          item_service: item.item_service,
          quantity: item.quantity,
          unit_type: item.unit_type,
          unit_price: item.unit_price,
          currency: item.currency,
          estimated_cost: item.quantity * item.unit_price,
          notes: item.notes,
          vendor: item.vendor,
          account_code: item.account_code,
        })),
      },
    },
  })
}


export async function add_requisition_item(
  requisitionId: string,
  item: RequisitionItemFormData
) {
  return prisma.requisition.update({
    where: { id: requisitionId },
    data: {
      items: {
        create: {
          item_service: item.item_service,
          quantity: item.quantity,
          unit_type: item.unit_type,
          unit_price: item.unit_price,
          currency: item.currency,
          estimated_cost: item.quantity * item.unit_price,
          notes: item.notes,
          vendor: item.vendor,
          account_code: item.account_code,
        },
      },
    },
  })
}

export async function update_requisition_item(
  requisitionId: string,
  itemId: string,
  item: RequisitionItemFormData
) {
  return prisma.requisition.update({
    where: { id: requisitionId },
    data: {
      items: {
        update: {
          where: { id: itemId },
          data: {
            item_service: item.item_service,
            quantity: item.quantity,
            unit_type: item.unit_type,
            unit_price: item.unit_price,
            currency: item.currency,
            estimated_cost: item.quantity * item.unit_price,
            notes: item.notes,
            vendor: item.vendor,
            account_code: item.account_code,
          },
        },
      },
    },
  })
}

export async function delete_requisition_item(
  requisitionId: string,
  itemId: string
) {
  return prisma.requisition.update({
    where: { id: requisitionId },
    data: {
      items: {
        delete: { id: itemId },
      },
    },
  })
}

export async function get_requisition_by_id(requisitionId: string) {
  return prisma.requisition.findUnique({
    where: { id: requisitionId },
    include: {
      items: true,
    },
  })
}

export async function get_requisitions_by_user_id(userId: string) {
  return prisma.requisition.findMany({
    where: { user_id: userId },
    include: {
      items: true,
    },
    orderBy: {
      date_request: 'desc',
    },
  })
}

export async function get_all_requisitions(page = 1, page_size = 10) {
  const skip = (page - 1) * page_size;
  const take = page_size;

  const requisitions = await prisma.requisition.findMany({
    skip,
    take,
    include: {
      items: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      date_request: 'asc',
    },
  });

  const total = await prisma.requisition.count();

  return {
    data: requisitions,
    page,
    page_size,
    total,
    total_pages: Math.ceil(total / page_size),
  };
}



export async function get_requisitions() {
  return prisma.requisition.findMany({
    include: {
      items: true,
    },
    orderBy: {
      created_at: "desc",
    },
  })
}

