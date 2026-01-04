import { X } from 'lucide-react'
import { useEffect } from 'react'

export default function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-md' }) {
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
    } else {
      document.documentElement.style.overflow = 'auto'
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.documentElement.style.overflow = 'auto'
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="fixed bottom-20 md:bottom-auto left-0 right-0 md:left-auto md:right-auto md:top-1/2 md:-translate-y-1/2 flex p-2 md:p-4 overflow-y-auto md:overflow-visible max-h-[80vh] md:max-h-[90vh]">
        {/* Modal */}
        <div className={`relative bg-white rounded-t-2xl md:rounded-2xl shadow-2xl w-full mx-2 md:mx-0 ${maxWidth} max-h-[80vh] md:max-h-[90vh] overflow-hidden flex flex-col border border-gray-100`}>
          {/* Header */}
          <div className="flex-shrink-0 bg-white flex items-center justify-between p-3 md:p-4 border-b z-10 sticky top-0">
            <h2 className="text-base md:text-lg font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="tap-target p-1 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
