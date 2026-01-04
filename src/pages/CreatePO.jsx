import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useData } from '../contexts/DataContext'
import { purchaseOrderSchema } from '../lib/validation'
import { generatePONumber } from '../lib/utils'
import { getDraft, saveDraft, clearDraft } from '../lib/offline'
import { downloadPDF, sharePDF } from '../services/pdfService'
import { FlowButton } from '../components/ui/FlowButton'
import Input from '../components/Input'
import Select from '../components/Select'
import Textarea from '../components/Textarea'
import { ArrowLeft, Download, Share2 } from 'lucide-react'

export default function CreatePO() {
  const navigate = useNavigate()
  const { mills, products, customers, purchaseOrders, companyDetails, addPurchaseOrder } = useData()
  const [loading, setLoading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [formData, setFormData] = useState(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(purchaseOrderSchema),
    defaultValues: {
      po_number: '',
      date: new Date().toISOString().split('T')[0],
      weight_unit: 'Kg',
      quantity_unit: 'Bags'
    }
  })

  // Load draft on mount
  useEffect(() => {
    const loadDraft = async () => {
      const draft = await getDraft('create_po')
      if (draft?.data) {
        Object.keys(draft.data).forEach(key => {
          setValue(key, draft.data[key])
        })
      }
    }
    loadDraft()
  }, [setValue])

  // Generate PO Number - Use highest number + 1
  useEffect(() => {
    if (purchaseOrders.length > 0) {
      // Find the highest PO number
      const poNumbers = purchaseOrders
        .map(po => parseInt(po.po_number) || 0)
        .filter(num => num > 0)
      
      const highestNumber = Math.max(...poNumbers, 0)
      const newNumber = String(highestNumber + 1)
      setValue('po_number', newNumber)
    } else {
      setValue('po_number', '1')
    }
  }, [purchaseOrders, setValue])

  // Auto-save draft
  const formValues = watch()
  useEffect(() => {
    const timer = setTimeout(() => {
      saveDraft('create_po', formValues)
    }, 1000)
    return () => clearTimeout(timer)
  }, [formValues])

  const onSubmit = async (data) => {
    // Check for duplicate PO number
    const isDuplicate = purchaseOrders.some(po => po.po_number === data.po_number)
    
    if (isDuplicate) {
      alert(`PO Number ${data.po_number} already exists. Please use a different number.`)
      return
    }
    
    setFormData(data)
    setShowPreview(true)
  }

  const handleConfirm = async () => {
    setLoading(true)
    try {
      await addPurchaseOrder(formData)
      await clearDraft('create_po')
      navigate('/history')
    } catch (error) {
      console.error('Error creating PO:', error)
      alert('Failed to create purchase order')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async () => {
    try {
      await downloadPDF(formData, companyDetails)
    } catch (error) {
      console.error('Error downloading PDF:', error)
      alert('Failed to download PDF')
    }
  }

  const handleShare = async () => {
    try {
      await sharePDF(formData, companyDetails)
    } catch (error) {
      console.error('Error sharing PDF:', error)
      alert('Failed to share PDF')
    }
  }

  if (showPreview && formData) {
    return (
      <div className="container-mobile py-6">
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={() => setShowPreview(false)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
            Back to Edit
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
          <h2 className="text-xl font-bold mb-4 text-center">Purchase Order Preview</h2>
          
          <div className="space-y-3 border-t pt-4">
            <div className="flex justify-between">
              <span className="font-medium">PO Number:</span>
              <span>{formData.po_number}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Date:</span>
              <span>{formData.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Party Name:</span>
              <span>{formData.party_name}</span>
            </div>
            {formData.broker && (
              <div className="flex justify-between">
                <span className="font-medium">Broker:</span>
                <span>{formData.broker}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="font-medium">Mill:</span>
              <span>{formData.mill}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Product:</span>
              <span>{formData.product}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Rate:</span>
              <span>₹{formData.rate}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Weight:</span>
              <span>{formData.weight} {formData.weight_unit}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Quantity:</span>
              <span>{formData.quantity} {formData.quantity_unit}</span>
            </div>
            {formData.terms_conditions && (
              <div className="pt-3 border-t">
                <span className="font-medium">Terms & Conditions:</span>
                <p className="mt-2 text-gray-700 whitespace-pre-wrap">{formData.terms_conditions}</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <FlowButton fullWidth onClick={handleConfirm} loading={loading} text="Confirm & Save" color="success" />
          <FlowButton fullWidth onClick={handleDownload} text="Download PDF" color="info" />
          <FlowButton fullWidth onClick={handleShare} text="Share PDF" color="info" />
        </div>
      </div>
    )
  }

  return (
    <div className="container-mobile py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create Purchase Order</h1>
        <p className="text-gray-600 text-sm mt-1">Fill in the details below</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="PO Number"
          required
          {...register('po_number')}
          error={errors.po_number?.message}
        />

        <Input
          type="date"
          label="Date"
          required
          {...register('date')}
          error={errors.date?.message}
        />

        <Select
          label="Party Name"
          required
          options={customers.map(c => ({ value: c.name, label: c.name }))}
          placeholder="Select customer"
          {...register('party_name')}
          error={errors.party_name?.message}
        />

        <Input
          label="Broker"
          {...register('broker')}
          error={errors.broker?.message}
        />

        <Select
          label="Mill"
          required
          options={mills.map(m => ({ value: m.name, label: m.name }))}
          placeholder="Select mill"
          {...register('mill')}
          error={errors.mill?.message}
        />

        <Select
          label="Product"
          required
          options={products.map(p => ({ value: p.name, label: p.name }))}
          placeholder="Select product"
          {...register('product')}
          error={errors.product?.message}
        />

        <Input
          label="Rate"
          required
          type="number"
          step="0.01"
          {...register('rate')}
          error={errors.rate?.message}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Weight"
            required
            {...register('weight')}
            error={errors.weight?.message}
          />
          <Select
            label="Unit"
            required
            options={[
              { value: 'Kg', label: 'Kg' },
              { value: 'Meters', label: 'Meters' }
            ]}
            {...register('weight_unit')}
            error={errors.weight_unit?.message}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Quantity"
            required
            {...register('quantity')}
            error={errors.quantity?.message}
          />
          <Select
            label="Unit"
            required
            options={[
              { value: 'Bags', label: 'Bags' },
              { value: 'Taka', label: 'Taka' }
            ]}
            {...register('quantity_unit')}
            error={errors.quantity_unit?.message}
          />
        </div>

        <Textarea
          label="Terms & Conditions"
          rows={4}
          {...register('terms_conditions')}
          error={errors.terms_conditions?.message}
        />

        <div className="pt-4">
          <FlowButton type="submit" fullWidth text="Preview Order" />
        </div>
      </form>
    </div>
  )
}
