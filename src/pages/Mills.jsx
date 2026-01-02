import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useData } from '../contexts/DataContext'
import { millSchema } from '../lib/validation'
import Button from '../components/Button'
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
    resolver: zodResolver(millSchema)
  })

  const openModal = (mill = null) => {
    setEditingMill(mill)
    if (mill) {
      reset(mill)
    } else {
      reset({})
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
      } else {
        await addMill(data)
      }
      closeModal()
    } catch (error) {
      console.error('Error saving mill:', error)
      alert('Failed to save mill')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this mill?')) {
      try {
        await deleteMill(id)
      } catch (error) {
        console.error('Error deleting mill:', error)
        alert('Failed to delete mill')
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
        <Button onClick={() => openModal()}>
          <Plus size={20} />
          Add Mill
        </Button>
      </div>

      {mills.length > 0 ? (
        <div className="space-y-3">
          {mills.map((mill) => (
            <Card key={mill.id}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{mill.name}</h3>
                  {mill.contact && (
                    <p className="text-sm text-gray-600 mt-1">{mill.contact}</p>
                  )}
                  {mill.email && (
                    <p className="text-sm text-gray-600">{mill.email}</p>
                  )}
                  {mill.address && (
                    <p className="text-sm text-gray-500 mt-2">{mill.address}</p>
                  )}
                  {mill.gstin && (
                    <p className="text-xs text-gray-500 mt-1">GSTIN: {mill.gstin}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(mill)}
                    className="tap-target p-2 text-primary-600 hover:bg-primary-50 rounded"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(mill.id)}
                    className="tap-target p-2 text-red-600 hover:bg-red-50 rounded"
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
            <Button onClick={() => openModal()}>
              <Plus size={20} />
              Add Mill
            </Button>
          }
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingMill ? 'Edit Mill' : 'Add Mill'}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Mill Name"
            required
            {...register('name')}
            error={errors.name?.message}
          />

          <Input
            label="Contact"
            type="tel"
            {...register('contact')}
            error={errors.contact?.message}
          />

          <Input
            label="Email"
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />

          <Textarea
            label="Address"
            rows={3}
            {...register('address')}
            error={errors.address?.message}
          />

          <Input
            label="GSTIN"
            {...register('gstin')}
            error={errors.gstin?.message}
          />

          <Textarea
            label="Mill Details"
            rows={3}
            {...register('mill_detail')}
            error={errors.mill_detail?.message}
          />

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={closeModal} fullWidth>
              Cancel
            </Button>
            <Button type="submit" fullWidth loading={submitting}>
              {editingMill ? 'Update' : 'Add'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
