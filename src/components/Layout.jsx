import { Outlet } from 'react-router-dom'
import BottomNav from './BottomNav'
import Header from './Header'
import { useOffline } from '../contexts/OfflineContext'

export default function Layout() {
  const { isOnline } = useOffline()

  return (
    <div className="min-h-screen min-h-[100dvh] flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      {!isOnline && (
        <div className="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-center sticky top-12 sm:top-14 z-30">
          You are offline. Changes will sync when connection is restored.
        </div>
      )}
      <main className="flex-1 overflow-y-auto overflow-x-hidden pb-16 sm:pb-20 -webkit-overflow-scrolling-touch">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
