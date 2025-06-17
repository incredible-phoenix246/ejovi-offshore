import { z } from 'zod/v4'

export const requisitionSchema = z.object({
  description: z.string().optional(),
  date_request: z.date({
    error: 'Date of request is required',
  }),
  department: z.string().min(1, 'Department is required'),
  location: z.string().min(1, 'Location is required'),
  fleet: z.string().min(1, 'Fleet is required'),
  category: z.string().min(1, 'Category is required'),
})

export const requisitionItemSchema = z.object({
  item_service: z.string().min(1, 'Item or service name is required'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  unit_type: z.enum(['EACH', 'KG', 'LITER', 'METER', 'HOUR', 'DAY', 'PIECE']),
  unit_price: z.number().min(0, 'Unit price must be positive'),
  currency: z.enum(['USD', 'EUR', 'GBP', 'NGN']),
  notes: z.string().optional(),
  vendor: z.string().optional(),
  account_code: z.string().min(1, 'Account code is required'),
})

export type RequisitionFormData = z.infer<typeof requisitionSchema>
export type RequisitionItemFormData = z.infer<typeof requisitionItemSchema>

// Options for dropdowns
export const departmentOptions = [
  { value: 'Operations', label: 'Operations' },
  { value: 'Admin', label: 'Admin' },
  { value: 'HSE', label: 'HSE' },
  { value: 'Maintenance', label: 'Maintenance' },
  { value: 'IT', label: 'IT' },
  { value: 'Kitchen', label: 'Kitchen' },
  { value: 'Engine', label: 'Engine' },
  { value: 'Boat', label: 'Boat' },
  { value: 'Logistics', label: 'Logistics' },
]

export const locationOptions = [
  { value: 'Lagos Office', label: 'Lagos Office' },
  { value: 'Warri', label: 'Warri' },
  { value: 'Port Harcourt', label: 'Port Harcourt' },
  { value: 'Lagos', label: 'Lagos' },
]

export const fleetOptions = [
  { value: 'JV Iragha', label: 'JV Iragha' },
  { value: 'JV Antares', label: 'JV Antares' },
  { value: 'Ned Stark', label: 'Ned Stark' },
  { value: 'JV 32', label: 'JV 32' },
  { value: 'JV Adaba', label: 'JV Adaba' },
]

export const categoryOptions = [
  { value: 'Fleet', label: 'Fleet' },
  { value: 'Office', label: 'Office' },
]

export const vendorOptions = [
  { value: 'IT Equipment', label: 'IT Equipment' },
  { value: 'Office Supplies', label: 'Office Supplies' },
  { value: 'Shipping', label: 'Shipping' },
  { value: 'Printing Services', label: 'Printing Services' },
  { value: 'Furniture', label: 'Furniture' },
  { value: 'Cleaning', label: 'Cleaning' },
  { value: 'Food Services', label: 'Food Services' },
]

export const accountCodeOptions = [
  { value: 'ACC001', label: 'ACC001 - Office Equipment' },
  { value: 'ACC002', label: 'ACC002 - IT Hardware' },
  { value: 'ACC003', label: 'ACC003 - Maintenance Supplies' },
  { value: 'ACC004', label: 'ACC004 - Office Supplies' },
  { value: 'ACC005', label: 'ACC005 - Safety Equipment' },
  { value: 'ACC006', label: 'ACC006 - Furniture' },
  { value: 'ACC007', label: 'ACC007 - Cleaning Supplies' },
  { value: 'ACC008', label: 'ACC008 - Food & Catering' },
]

export const unitTypeOptions = [
  { value: 'EACH', label: 'Each' },
  { value: 'KG', label: 'Kg' },
  { value: 'LITER', label: 'Liter' },
  { value: 'METER', label: 'Meter' },
  { value: 'HOUR', label: 'Hour' },
  { value: 'DAY', label: 'Day' },
  { value: 'PIECE', label: 'Piece' },
]

export const currencyOptions = [
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
  { value: 'GBP', label: 'GBP' },
  { value: 'NGN', label: 'NGN' },
]
