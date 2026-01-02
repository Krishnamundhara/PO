import { useState, useMemo } from 'react'
import { useData } from '../contexts/DataContext'
import { downloadPDF, sharePDF } from '../services/pdfService'
import Card from '../components/Card'
import Button from '../components/Button'
import Input from '../components/Input'
import EmptyState from '../components/EmptyState'
import Loading from '../components/Loading'
import Modal from '../components/Modal'
import { History, Search, Download, Share2, Eye, Edit2, Trash2 } from 'lucide-react'
import { formatDate } from '../lib/utils'
import EditPOModal from '../components/EditPOModal'

export default function OrderHistory() {
  const { purchaseOrders, companyDetails, loading, updatePO, deletePO } = useData()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const filteredOrders = useMemo(() => {
    if (!searchTerm) return purchaseOrders

    const term = searchTerm.toLowerCase()
    return purchaseOrders.filter(order =>
      order.po_number.toLowerCase().includes(term) ||
      order.party_name.toLowerCase().includes(term) ||
      order.mill.toLowerCase().includes(term) ||
      order.product.toLowerCase().includes(term)
    )
  }, [purchaseOrders, searchTerm])

  const viewOrder = (order) => {
    setSelectedOrder(order)
    setIsModalOpen(true)
  }

  const editOrder = (order) => {
    setSelectedOrder(order)
    setIsEditOpen(true)
  }

  const handleDownload = async (order) => {
    try {
      await downloadPDF(order, companyDetails)
    } catch (error) {
      console.error('Error downloading PDF:', error)
      alert('Failed to download PDF')
    }
  }

  const handleShare = async (order) => {
    try {
      await sharePDF(order, companyDetails)
    } catch (error) {
      console.error('Error sharing PDF:', error)
      alert('Failed to share PDF')
    }
  }

  const handleDelete = async (id) => {
    try {
      await deletePO(id)
      setDeleteConfirm(null)
      alert('Purchase order deleted successfully')
    } catch (error) {
      console.error('Error deleting PO:', error)
      alert('Failed to delete purchase order')
    }
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="container-mobile py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Order History</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder="Search by PO#, customer, mill, or product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {filteredOrders.length > 0 ? (
        <div className="space-y-3">
          {filteredOrders.map((order) => (
            <Card key={order.id}>
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-primary-600">PO #{order.po_number}</div>
                    <div className="text-sm text-gray-600 mt-1">{order.party_name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">{formatDate(order.date)}</div>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600">
                  <div>Mill: {order.mill}</div>
                  <div>Product: {order.product}</div>
                  <div>Qty: {order.quantity} {order.quantity_unit}</div>
                </div>

                <div className="flex gap-2 pt-2 flex-wrap">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => viewOrder(order)}
                  >
                    <Eye size={16} />
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => editOrder(order)}
                  >
                    <Edit2 size={16} />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleDownload(order)}
                  >
                    <Download size={16} />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleShare(order)}
                  >
                    <Share2 size={16} />
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => setDeleteConfirm(order.id)}
                  >
                    <Trash2 size={16} />
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={History}
          title={searchTerm ? "No orders found" : "No orders yet"}
          description={searchTerm ? "Try a different search term" : "Create your first purchase order to see it here"}
        />
      )}

      {selectedOrder && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`PO #${selectedOrder.po_number}`}
          maxWidth="max-w-lg"
        >
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium">Date:</span>
              <span>{formatDate(selectedOrder.date)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Party Name:</span>
              <span>{selectedOrder.party_name}</span>
            </div>
            {selectedOrder.broker && (
              <div className="flex justify-between">
                <span className="font-medium">Broker:</span>
                <span>{selectedOrder.broker}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="font-medium">Mill:</span>
              <span>{selectedOrder.mill}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Product:</span>
              <span>{selectedOrder.product}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Rate:</span>
              <span>₹{selectedOrder.rate}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Weight:</span>
              <span>{selectedOrder.weight} {selectedOrder.weight_unit}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Quantity:</span>
              <span>{selectedOrder.quantity} {selectedOrder.quantity_unit}</span>
            </div>
            {selectedOrder.terms_conditions && (
              <div className="pt-3 border-t">
                <span className="font-medium">Terms & Conditions:</span>
                <p className="mt-2 text-gray-700 whitespace-pre-wrap text-sm">
                  {selectedOrder.terms_conditions}
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-6">
            <Button
              fullWidth
              variant="secondary"
              onClick={() => handleDownload(selectedOrder)}
            >
              <Download size={20} />
              Download
            </Button>
            <Button
              fullWidth
              variant="outline"
              onClick={() => handleShare(selectedOrder)}
            >
              <Share2 size={20} />
              Share
            </Button>
          </div>
        </Modal>
      )}

      {selectedOrder && isEditOpen && (
        <EditPOModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          order={selectedOrder}
          onSave={() => setIsEditOpen(false)}
        />
      )}

      {deleteConfirm && (
        <Modal
          isOpen={!!deleteConfirm}
          onClose={() => setDeleteConfirm(null)}
          title="Delete Purchase Order"
          maxWidth="max-w-sm"
        >
          <div className="space-y-4">
            <p className="text-gray-700">
              Are you sure you want to delete PO #{purchaseOrders.find(po => po.id === deleteConfirm)?.po_number}?
            </p>
            <p className="text-sm text-gray-500">
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button
                fullWidth
                variant="outline"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </Button>
              <Button
                fullWidth
                variant="danger"
                onClick={() => handleDelete(deleteConfirm)}
              >
                Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

