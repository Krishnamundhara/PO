import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { useData } from '../contexts/DataContext'
import { customerSchema } from '../lib/validation'
import { FlowButton } from '../components/ui/FlowButton'
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
        toast.success('Customer updated successfully')
      } else {
        await addCustomer(data)
        toast.success('Customer added successfully')
      }
      closeModal()
    } catch (error) {
      console.error('Error saving customer:', error)
      toast.error('Failed to save customer')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await deleteCustomer(id)
        toast.success('Customer deleted successfully')
      } catch (error) {
        console.error('Error deleting customer:', error)
        toast.error('Failed to delete customer')
      }
    }
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="container-mobile py-4 sm:py-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Customers</h1>
        <FlowButton onClick={() => openModal()} text="Add Customer" color="success" />
      </div>

      {customers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {customers.map((customer) => (
            <Card key={customer.id} className="h-full flex flex-col">
              <div className="flex items-start justify-between h-full">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-base sm:text-lg truncate">{customer.name}</h3>
                  {customer.contact && (
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-0.5 sm:mt-1">{customer.contact}</p>
                  )}
                  {customer.email && (
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 truncate">{customer.email}</p>
                  )}
                  {customer.address && (
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-2 line-clamp-2">{customer.address}</p>
                  )}
                </div>
                <div className="flex gap-1 sm:gap-2 flex-shrink-0 ml-2">
                  <button
                    onClick={() => openModal(customer)}
                    className="tap-target p-1.5 sm:p-2 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 rounded transition-colors"
                  >
                    <Edit2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </button>
                  <button
                    onClick={() => handleDelete(customer.id)}
                    className="tap-target p-1.5 sm:p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"
                  >
                    <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
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
            <FlowButton onClick={() => openModal()} text="Add Customer" color="success" />
          }
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingCustomer ? 'Edit Customer' : 'Add Customer'}
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto space-y-3 sm:space-y-4">
            <Input
              label="Customer Name"
              required
              {...register('name')}
              error={errors.name?.message}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
            </div>

            <Textarea
              label="Address"
              rows={3}
              {...register('address')}
              error={errors.address?.message}
            />
          </div>

          <div className="flex-shrink-0 flex gap-2 sm:gap-3 pt-3 sm:pt-4 border-t dark:border-gray-700">
            <FlowButton type="button" onClick={closeModal} fullWidth text="Cancel" color="neutral" />
            <FlowButton type="submit" fullWidth loading={submitting} text={editingCustomer ? 'Update' : 'Add'} color="success" />
          </div>
        </form>
      </Modal>
    </div>
  )
}
