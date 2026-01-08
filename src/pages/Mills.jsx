import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { useData } from '../contexts/DataContext'
import { millSchema } from '../lib/validation'
import { FlowButton } from '../components/ui/FlowButton'
import Input from '../components/Input'
import Textarea from '../components/Textarea'
import Modal from '../components/Modal'
import Card from '../components/Card'
import EmptyState from '../components/EmptyState'
import Loading from '../components/Loading'
import { Plus, Edit2, Trash2, Factory } from 'lucide-react'

export default function Mills() {
  const { mills, addMill, updateMill, deleteMill, loading } = useData()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingMill, setEditingMill] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(millSchema),
    defaultValues: editingMill || {}
  })

  const openModal = (mill = null) => {
    setEditingMill(mill)
    if (mill) {
      reset({
        name: mill.name || '',
        contact: mill.contact || '',
        email: mill.email || '',
        address: mill.address || '',
        gstin: mill.gstin || '',
        mill_detail: mill.mill_detail || ''
      })
    } else {
      reset({
        name: '',
        contact: '',
        email: '',
        address: '',
        gstin: '',
        mill_detail: ''
      })
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingMill(null)
    reset({})
  }

  const onSubmit = async (data) => {
    setSubmitting(true)
    try {
      if (editingMill) {
        await updateMill(editingMill.id, data)
        toast.success('Mill updated successfully')
      } else {
        await addMill(data)
        toast.success('Mill added successfully')
      }
      closeModal()
    } catch (error) {
      console.error('Error saving mill:', error)
      toast.error(`Failed to save mill: ${error.message || 'Unknown error'}`)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this mill?')) {
      try {
        await deleteMill(id)
        toast.success('Mill deleted successfully')
      } catch (error) {
        console.error('Error deleting mill:', error)
        toast.error('Failed to delete mill')
      }
    }
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="container-mobile py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Mills</h1>
        <FlowButton onClick={() => openModal()} text="Add Mill" color="success" />
      </div>

      {mills.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mills.map((mill) => (
            <Card key={mill.id} className="h-full flex flex-col">
              <div className="flex items-start justify-between h-full">
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{mill.name}</h3>
                  {mill.contact && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{mill.contact}</p>
                  )}
                  {mill.email && (
                    <p className="text-sm text-gray-600 dark:text-gray-300">{mill.email}</p>
                  )}
                  {mill.address && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{mill.address}</p>
                  )}
                  {mill.gstin && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">GSTIN: {mill.gstin}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(mill)}
                    className="tap-target p-2 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 rounded transition-colors"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(mill.id)}
                    className="tap-target p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Factory}
          title="No mills yet"
          description="Add your first mill to get started with creating purchase orders"
          action={
            <FlowButton onClick={() => openModal()} text="Add Mill" color="success" />
          }
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingMill ? 'Edit Mill' : 'Add Mill'}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-4 md:space-y-5">
            <Input
              label="Mill Name"
              required
              className="py-3"
              {...register('name')}
              error={errors.name?.message}
            />

            <Input
              label="Contact"
              type="tel"
              className="py-3"
              {...register('contact')}
              error={errors.contact?.message}
            />

            <Input
              label="Email"
              type="email"
              className="py-3"
              {...register('email')}
              error={errors.email?.message}
            />

            <Textarea
              label="Address"
              rows={5}
              {...register('address')}
              error={errors.address?.message}
            />

            <Input
              label="GSTIN"
              className="py-3"
              {...register('gstin')}
              error={errors.gstin?.message}
            />

            <Textarea
              label="Mill Details"
              rows={5}
              {...register('mill_detail')}
              error={errors.mill_detail?.message}
            />
          </div>

          <div className="flex-shrink-0 flex gap-4 md:gap-3 p-4 md:p-5 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <FlowButton type="button" onClick={closeModal} fullWidth text="Cancel" color="neutral" />
            <FlowButton type="submit" fullWidth loading={submitting} text={editingMill ? 'Update' : 'Add'} color="success" />
          </div>
        </form>
      </Modal>
    </div>
  )
}
