import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
      } else {
        await addProduct(data)
      }
      closeModal()
    } catch (error) {
      console.error('Error saving product:', error)
      alert('Failed to save product')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id)
      } catch (error) {
        console.error('Error deleting product:', error)
        alert('Failed to delete product')
      }
    }
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="container-mobile py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <FlowButton onClick={() => openModal()} text="Add Product" color="success" />
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <Card key={product.id} className="h-full flex flex-col">
              <div className="flex items-start justify-between h-full">
                <div className="flex-1">
                  <h3 className="font-medium">{product.name}</h3>
                  {product.description && (
                    <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(product)}
                    className="tap-target p-2 text-primary-600 hover:bg-primary-50 rounded"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
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
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-4 md:space-y-5">
            <Input
              label="Product Name"
              required
              className="py-3"
              {...register('name')}
              error={errors.name?.message}
            />

            <Textarea
              label="Description"
              rows={5}
              {...register('description')}
              error={errors.description?.message}
            />
          </div>

          <div className="flex-shrink-0 flex gap-2 md:gap-3 p-4 md:p-5 border-t bg-gray-50">
            <FlowButton type="button" onClick={closeModal} fullWidth text="Cancel" color="neutral" />
            <FlowButton type="submit" fullWidth loading={submitting} text={editingProduct ? 'Update' : 'Add'} color="success" />
          </div>
        </form>
      </Modal>
    </div>
  )
}
