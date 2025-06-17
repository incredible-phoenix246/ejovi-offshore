import { create } from "zustand"
import { devtools } from "zustand/middleware"

export interface RequisitionItem {
    id?: string
    item_service: string
    quantity: number
    unit_type: string
    unit_price: number
    currency: string
    estimated_cost: number
    notes?: string
    vendor?: string
    account_code?: string
}

export interface Requisition {
    id?: string
    rfq_no?: string
    description?: string
    status?: string
    date_request: Date
    department?: string
    location?: string
    fleet?: string
    category?: string
    items: RequisitionItem[]
}

interface RequisitionStore {
    currentRequisition: Requisition | null
    requisitions: Requisition[]
    isLoading: boolean
    isSubmitting: boolean

    // Actions
    setCurrentRequisition: (requisition: Requisition | null) => void
    updateCurrentRequisition: (updates: Partial<Requisition>) => void
    addItemToCurrentRequisition: (item: RequisitionItem) => void
    removeItemFromCurrentRequisition: (index: number) => void
    updateItemInCurrentRequisition: (index: number, item: RequisitionItem) => void
    setRequisitions: (requisitions: Requisition[]) => void
    setLoading: (loading: boolean) => void
    setSubmitting: (submitting: boolean) => void
    clearCurrentRequisition: () => void
}

export const useRequisition = create<RequisitionStore>()(
    devtools(
        (set, get) => ({
            currentRequisition: null,
            requisitions: [],
            isLoading: false,
            isSubmitting: false,

            setCurrentRequisition: (requisition) => set({ currentRequisition: requisition }, false, "setCurrentRequisition"),

            updateCurrentRequisition: (updates) =>
                set(
                    (state) => ({
                        currentRequisition: state.currentRequisition ? { ...state.currentRequisition, ...updates } : null,
                    }),
                    false,
                    "updateCurrentRequisition",
                ),

            addItemToCurrentRequisition: (item) =>
                set(
                    (state) => ({
                        currentRequisition: state.currentRequisition
                            ? {
                                ...state.currentRequisition,
                                items: [...state.currentRequisition.items, item],
                            }
                            : null,
                    }),
                    false,
                    "addItemToCurrentRequisition",
                ),

            removeItemFromCurrentRequisition: (index) =>
                set(
                    (state) => ({
                        currentRequisition: state.currentRequisition
                            ? {
                                ...state.currentRequisition,
                                items: state.currentRequisition.items.filter((_, i) => i !== index),
                            }
                            : null,
                    }),
                    false,
                    "removeItemFromCurrentRequisition",
                ),

            updateItemInCurrentRequisition: (index, item) =>
                set(
                    (state) => ({
                        currentRequisition: state.currentRequisition
                            ? {
                                ...state.currentRequisition,
                                items: state.currentRequisition.items.map((existingItem, i) => (i === index ? item : existingItem)),
                            }
                            : null,
                    }),
                    false,
                    "updateItemInCurrentRequisition",
                ),

            setRequisitions: (requisitions) => set({ requisitions }, false, "setRequisitions"),

            setLoading: (loading) => set({ isLoading: loading }, false, "setLoading"),

            setSubmitting: (submitting) => set({ isSubmitting: submitting }, false, "setSubmitting"),

            clearCurrentRequisition: () => set({ currentRequisition: null }, false, "clearCurrentRequisition"),
        }),
        {
            name: "requisition-store",
        },
    ),
)
