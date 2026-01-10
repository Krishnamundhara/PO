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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full sm:w-auto flex justify-center items-end sm:items-center max-h-[85vh] sm:max-h-[90vh] animate-slide-up sm:animate-zoom-in">
        {/* Modal */}
        <div className={`relative bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:mx-4 ${maxWidth} max-h-[85vh] sm:max-h-[90vh] overflow-hidden flex flex-col border-t sm:border border-gray-100 dark:border-gray-700 transition-colors mb-14 sm:mb-0`}>
          {/* Header */}
          <div className="flex-shrink-0 bg-white dark:bg-gray-800 flex items-center justify-between p-3 sm:p-4 border-b dark:border-gray-700 z-10 sticky top-0 transition-colors">
            <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 truncate pr-2">{title}</h2>
            <button
              onClick={onClose}
              className="tap-target p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:rotate-90 hover:scale-110 active:scale-95 rounded-lg transition-all duration-200 flex-shrink-0"
            >
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>
          </div>
          
          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto overscroll-contain p-3 sm:p-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
