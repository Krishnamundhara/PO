import { z } from 'zod'

export const millSchema = z.object({
  name: z.string().min(1, 'Mill name is required'),
  contact: z.string().optional(),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  address: z.string().optional(),
  gstin: z.string().optional(),
  mill_detail: z.string().optional(),
  products: z.array(z.string()).optional()
})

export const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().optional()
})

export const customerSchema = z.object({
  name: z.string().min(1, 'Customer name is required'),
  contact: z.string().optional(),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  address: z.string().optional()
})

export const purchaseOrderSchema = z.object({
  po_number: z.string().min(1, 'PO Number is required'),
  date: z.string().min(1, 'Date is required'),
  party_name: z.string().min(1, 'Party name is required'),
  broker: z.string().optional(),
  mill: z.string().min(1, 'Mill is required'),
  weight: z.string().min(1, 'Weight is required'),
  weight_unit: z.enum(['Kg', 'Meters']).default('Kg'),
  quantity: z.string().min(1, 'Quantity is required'),
  quantity_unit: z.enum(['Bags', 'Taka']).default('Bags'),
  product: z.string().min(1, 'Product is required'),
  rate: z.string().min(1, 'Rate is required'),
  terms_conditions: z.string().optional()
})

export const companyDetailsSchema = z.object({
  name: z.string().min(1, 'Company name is required'),
  address: z.string().optional(),
  bank_name: z.string().optional(),
  account_number: z.string().optional(),
  ifsc_code: z.string().optional(),
  branch: z.string().optional(),
  logo: z.string().optional()
})
