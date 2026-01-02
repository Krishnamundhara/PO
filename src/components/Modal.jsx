import { X } from 'lucide-react'
import { useEffect } from 'react'

export default function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-md' }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden safe-area-inset-bottom safe-area-inset-top">
      <div className="flex min-h-full items-center justify-center p-4 py-8">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className={`relative bg-white rounded-lg shadow-xl w-full ${maxWidth} max-h-[85vh] overflow-y-auto`}>
          {/* Header */}
          <div className="sticky top-0 bg-white flex items-center justify-between p-4 border-b z-10">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="tap-target p-1 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Content */}
          <div className="p-4 pb-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
