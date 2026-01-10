import { NavLink } from 'react-router-dom'
import { Home, FilePlus, Factory, Package, History } from 'lucide-react'

export default function BottomNav() {
  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/create-po', icon: FilePlus, label: 'Create' },
    { to: '/mills', icon: Factory, label: 'Mills' },
    { to: '/products', icon: Package, label: 'Products' },
    { to: '/history', icon: History, label: 'History' }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 safe-area-inset-bottom z-50 transition-colors">
      <div className="flex items-center justify-around h-14 sm:h-16 max-w-screen-lg mx-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 h-full min-w-0 px-1 transition-colors whitespace-nowrap ${isActive
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-300'
              }`
            }
          >
            <Icon size={20} className="sm:w-6 sm:h-6" />
            <span className="text-[10px] sm:text-xs mt-0.5 sm:mt-1 truncate max-w-full">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
