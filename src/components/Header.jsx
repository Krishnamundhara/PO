import { useAuth } from '../contexts/AuthContext'
import { Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 safe-area-inset-top transition-colors">
      <div className="container-mobile">
        <div className="flex items-center justify-between h-14">
          <h1 className="text-xl font-semibold text-primary-600 dark:text-primary-400">PO Generator</h1>
          <button
            onClick={() => navigate('/settings')}
            className="tap-target p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            aria-label="Settings"
          >
            <Settings size={24} />
          </button>
        </div>
      </div>
    </header>
  )
}
