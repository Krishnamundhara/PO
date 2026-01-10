import { useAuth } from '../contexts/AuthContext'
import { Settings, BarChart3 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import GradientButton from './ui/GradientButton'
import POButton from './ui/POButton'

export default function Header() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 safe-area-inset-top transition-colors sticky top-0 z-40">
      <div className="container-mobile">
        <div className="flex items-center justify-between h-12 sm:h-14">
          
          <button onClick={() => navigate('/')} className="px-2 py-1 sm:px-3 sm:py-1 border-2 border-primary-500 rounded-lg hover:border-primary-600 hover:shadow-md transition-all">
            <h1 className="text-base sm:text-lg md:text-xl font-semibold text-primary-600 dark:text-primary-400">PO Generator</h1>
          </button>        
          
          {/* <POButton
              onClick={() => navigate('/')}
              title="PO Generator"
              size="md"
              aria-label="Manager Dashboard"
          ></POButton> */}
          
          <div className="flex items-center gap-1 sm:gap-2">
            <GradientButton
              onClick={() => navigate('/manager')}
              icon={<BarChart3 />}
              title="MD"
              size="sm"
              aria-label="Manager Dashboard"
            />
            <button
              onClick={() => navigate('/settings')}
              className="tap-target p-1.5 sm:p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label="Settings"
            >
              <Settings size={22} className="sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
