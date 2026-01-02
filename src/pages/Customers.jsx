import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useData } from '../contexts/DataContext'
import { customerSchema } from '../lib/validation'
import Button from '../components/Button'
import Input from '../components/Input'
import Textarea from '../components/Textarea'
import Modal from '../components/Modal'
import Card from '../components/Card'
import EmptyState from '../components/EmptyState'
import Loading from '../components/Loading'
import { Plus, Edit2, Trash2, Users } from 'lucide-react'

export default function Customers() {
  const { customers, addCustomer, updateCustomer, deleteCustomer, loading } = useData()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(customerSchema)
  })

  const openModal = (customer = null) => {
    setEditingCustomer(customer)
    if (customer) {
      reset(customer)
    } else {
      reset({})
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingCustomer(null)
    reset({})
  }

  const onSubmit = async (data) => {
    setSubmitting(true)
    try {
      if (editingCustomer) {
        await updateCustomer(editingCustomer.id, data)
      } else {
        await addCustomer(data)
      }
      closeModal()
    } catch (error) {
      console.error('Error saving customer:', error)
      alert('Failed to save customer')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await deleteCustomer(id)
      } catch (error) {
        console.error('Error deleting customer:', error)
        alert('Failed to delete customer')
      }
    }
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="container-mobile py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Customers</h1>
        <Button onClick={() => openModal()}>
          <Plus size={20} />
          Add Customer
        </Button>
      </div>

      {customers.length > 0 ? (
        <div className="space-y-3">
          {customers.map((customer) => (
            <Card key={customer.id}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{customer.name}</h3>
                  {customer.contact && (
                    <p className="text-sm text-gray-600 mt-1">{customer.contact}</p>
                  )}
                  {customer.email && (
                    <p className="text-sm text-gray-600">{customer.email}</p>
                  )}
                  {customer.address && (
                    <p className="text-sm text-gray-500 mt-2">{customer.address}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(customer)}
                    className="tap-target p-2 text-primary-600 hover:bg-primary-50 rounded"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(customer.id)}
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
          icon={Users}
          title="No customers yet"
          description="Add customers to quickly select them when creating purchase orders"
          action={
            <Button onClick={() => openModal()}>
              <Plus size={20} />
              Add Customer
            </Button>
          }
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingCustomer ? 'Edit Customer' : 'Add Customer'}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Customer Name"
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

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={closeModal} fullWidth>
              Cancel
            </Button>
            <Button type="submit" fullWidth loading={submitting}>
              {editingCustomer ? 'Update' : 'Add'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
