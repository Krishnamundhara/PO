import { Outlet } from 'react-router-dom'
import BottomNav from './BottomNav'
import Header from './Header'
import { useOffline } from '../contexts/OfflineContext'

export default function Layout() {
  const { isOnline } = useOffline()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {!isOnline && (
        <div className="bg-yellow-100 text-yellow-800 px-4 py-2 text-sm text-center">
          You are offline. Changes will sync when connection is restored.
        </div>
      )}
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
