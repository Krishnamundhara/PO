import { AlertCircle } from 'lucide-react'

export default function EmptyState({ icon: Icon = AlertCircle, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 sm:py-12 px-4 text-center">
      <Icon size={40} className="sm:w-12 sm:h-12 text-gray-400 dark:text-gray-500 mb-3 sm:mb-4" />
      <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 mb-1.5 sm:mb-2">{title}</h3>
      {description && (
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 max-w-sm">{description}</p>
      )}
      {action && action}
    </div>
  )
}
