import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useData } from '../contexts/DataContext'
import { qualityRecordSchema } from '../lib/validation'
import Modal from './Modal'
import Button from './Button'
import Input from './Input'
import Textarea from './Textarea'

export default function EditQualityModal({ isOpen, onClose, record, onSave }) {
  const { updateQualityRecord, qualityRecords } = useData()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(qualityRecordSchema),
    defaultValues: record
  })

  const onSubmit = async (data) => {
    setSubmitting(true)
    setError('')
    try {
      // Check for duplicate SR numbers (excluding current record)
      const isDuplicate = qualityRecords.some(q => 
        q.id !== record.id && q.sr_no === data.sr_no
      )
      
      if (isDuplicate) {
        setError(`SR No ${data.sr_no} already exists. Please use a different number.`)
        setSubmitting(false)
        return
      }

      await updateQualityRecord(record.id, data)
      onSave()
      onClose()
    } catch (err) {
      console.error('Error updating quality record:', err)
      setError(err.message || 'Failed to update quality record')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Edit Quality Record SR #${record?.sr_no}`}
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4 max-h-[65vh] overflow-y-auto overscroll-contain px-0.5">
        {error && (
          <div className="p-2 sm:p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs sm:text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="SR No"
            type="number"
            required
            {...register('sr_no')}
            error={errors.sr_no?.message}
          />

          <Input
            label="Width"
            required
            {...register('width')}
            error={errors.width?.message}
            placeholder="e.g., 60 inches"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Quality"
            required
            {...register('quality')}
            error={errors.quality?.message}
            placeholder="e.g., Premium"
          />

          <Input
            label="Reed on Loom"
            required
            {...register('reed_on_loom')}
            error={errors.reed_on_loom?.message}
            placeholder="e.g., 1000"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Peek on Loom"
            required
            {...register('peek_on_loom')}
            error={errors.peek_on_loom?.message}
            placeholder="e.g., 500"
          />

          <Input
            label="Weight"
            required
            {...register('weight')}
            error={errors.weight?.message}
            placeholder="e.g., 250 Kg"
          />
        </div>

        <Input
          label="Rate"
          type="number"
          step="0.01"
          required
          {...register('rate')}
          error={errors.rate?.message}
          placeholder="e.g., 150.50"
        />

        <Textarea
          label="Remark"
          rows={3}
          placeholder="Additional remarks..."
          {...register('remark')}
          error={errors.remark?.message}
        />

        <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4 sticky bottom-0 bg-white dark:bg-gray-800 pb-1">
          <Button type="button" variant="secondary" onClick={onClose} fullWidth>
            Cancel
          </Button>
          <Button type="submit" fullWidth loading={submitting}>
            Update
          </Button>
        </div>
      </form>
    </Modal>
  )
}
