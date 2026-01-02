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
    <div className="fixed inset-0 z-50 flex items-center justify-center safe-area-inset-bottom safe-area-inset-top">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Container - Scrollable */}
      <div className="relative w-full h-full overflow-y-auto overflow-x-hidden flex items-center justify-center p-4 py-8">
        {/* Modal */}
        <div className={`relative bg-white rounded-lg shadow-xl w-full ${maxWidth} max-h-[90vh] overflow-hidden flex flex-col`}>
          {/* Header */}
          <div className="flex-shrink-0 sticky top-0 bg-white flex items-center justify-between p-4 border-b z-10">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="tap-target p-1 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto p-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
