import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { useData } from '../contexts/DataContext'
import { productSchema } from '../lib/validation'
import { FlowButton } from '../components/ui/FlowButton'
import Input from '../components/Input'
import Textarea from '../components/Textarea'
import Modal from '../components/Modal'
import Card from '../components/Card'
import EmptyState from '../components/EmptyState'
import Loading from '../components/Loading'
import { Plus, Edit2, Trash2, Package } from 'lucide-react'

export default function Products() {
  const { products, addProduct, updateProduct, deleteProduct, loading } = useData()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(productSchema)
  })

  const openModal = (product = null) => {
    setEditingProduct(product)
    if (product) {
      reset(product)
    } else {
      reset({})
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingProduct(null)
    reset({})
  }

  const onSubmit = async (data) => {
    setSubmitting(true)
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, data)
        toast.success('Product updated successfully')
      } else {
        await addProduct(data)
        toast.success('Product added successfully')
      }
      closeModal()
    } catch (error) {
      console.error('Error saving product:', error)
      toast.error('Failed to save product')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id)
        toast.success('Product deleted successfully')
      } catch (error) {
        console.error('Error deleting product:', error)
        toast.error('Failed to delete product')
      }
    }
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="container-mobile py-4 sm:py-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Products</h1>
        <FlowButton onClick={() => openModal()} text="Add Product" color="success" />
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {products.map((product) => (
            <Card key={product.id} className="h-full flex flex-col">
              <div className="flex items-start justify-between h-full">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm sm:text-base truncate">{product.name}</h3>
                  {product.description && (
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-0.5 sm:mt-1 line-clamp-2">{product.description}</p>
                  )}
                </div>
                <div className="flex gap-1 sm:gap-2 flex-shrink-0 ml-2">
                  <button
                    onClick={() => openModal(product)}
                    className="tap-target p-1.5 sm:p-2 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 rounded transition-colors"
                  >
                    <Edit2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
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
          icon={Package}
          title="No products yet"
          description="Add products to quickly fill in purchase orders"
          action={
            <FlowButton onClick={() => openModal()} text="Add Product" color="success" />
          }
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingProduct ? 'Edit Product' : 'Add Product'}
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto space-y-3 sm:space-y-4">
            <Input
              label="Product Name"
              required
              {...register('name')}
              error={errors.name?.message}
            />

            <Textarea
              label="Description"
              rows={3}
              {...register('description')}
              error={errors.description?.message}
            />
          </div>

          <div className="flex-shrink-0 flex gap-2 sm:gap-3 pt-3 sm:pt-4 border-t dark:border-gray-700">
            <FlowButton type="button" onClick={closeModal} fullWidth text="Cancel" color="neutral" />
            <FlowButton type="submit" fullWidth loading={submitting} text={editingProduct ? 'Update' : 'Add'} color="success" />
          </div>
        </form>
      </Modal>
    </div>
  )
}
