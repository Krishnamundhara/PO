import { useNavigate } from 'react-router-dom'
import { useData } from '../contexts/DataContext'
import { FilePlus, Factory, Package, History, Users } from 'lucide-react'
import Card from '../components/Card'
import Loading from '../components/Loading'
import { formatDate } from '../lib/utils'

export default function Dashboard() {
  const navigate = useNavigate()
  const { purchaseOrders, mills, products, customers, loading } = useData()

  const quickActions = [
    { icon: FilePlus, label: 'Create PO', path: '/create-po', color: 'bg-primary-500' },
    { icon: Factory, label: 'Mills', path: '/mills', color: 'bg-green-500' },
    { icon: Package, label: 'Products', path: '/products', color: 'bg-purple-500' },
    { icon: Users, label: 'Customers', path: '/customers', color: 'bg-orange-500' }
  ]

  const recentOrders = purchaseOrders.slice(0, 5)

  if (loading) {
    return <Loading />
  }

  return (
    <div className="container-mobile py-4 sm:py-6 space-y-4 sm:space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        <Card>
          <div className="text-center p-1 sm:p-2">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-600 dark:text-primary-400">{purchaseOrders.length}</div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-0.5 sm:mt-1">Total Orders</div>
          </div>
        </Card>
        <Card>
          <div className="text-center p-1 sm:p-2">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400">{mills.length}</div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-0.5 sm:mt-1">Mills</div>
          </div>
        </Card>
        <Card>
          <div className="text-center p-1 sm:p-2">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400">{products.length}</div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-0.5 sm:mt-1">Products</div>
          </div>
        </Card>
        <Card>
          <div className="text-center p-1 sm:p-2">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400">{customers.length}</div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-0.5 sm:mt-1">Customers</div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          {quickActions.map(({ icon: Icon, label, path, color }) => (
            <Card
              key={path}
              onClick={() => navigate(path)}
              className="cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col items-center text-center p-2 sm:p-3 md:p-4">
                <div className={`${color} text-white p-2 sm:p-3 rounded-full mb-2 sm:mb-3`}>
                  <Icon size={20} className="sm:w-6 sm:h-6" />
                </div>
                <span className="font-medium text-xs sm:text-sm md:text-base">{label}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div>
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h2 className="text-base sm:text-lg font-semibold">Recent Orders</h2>
          <button
            onClick={() => navigate('/history')}
            className="text-primary-600 dark:text-primary-400 text-xs sm:text-sm hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
          >
            View All
          </button>
        </div>
        {recentOrders.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
            {recentOrders.map((order) => (
              <Card key={order.id} onClick={() => navigate('/history')} className="h-full flex flex-col cursor-pointer hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start h-full">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm sm:text-base text-primary-600 dark:text-primary-400">PO #{order.po_number}</div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-0.5 sm:mt-1 truncate">{order.party_name}</div>
                    <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1 truncate">{order.product}</div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <div className="text-[10px] sm:text-sm text-gray-500 dark:text-gray-400">{formatDate(order.date)}</div>
                    <div className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 mt-0.5 sm:mt-1 truncate">{order.mill}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <div className="text-center py-6 sm:py-8 text-gray-500 dark:text-gray-400">
              <FilePlus size={40} className="sm:w-12 sm:h-12 mx-auto mb-2 text-gray-400 dark:text-gray-500" />
              <p className="text-sm sm:text-base">No orders yet</p>
              <button
                onClick={() => navigate('/create-po')}
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mt-2 text-sm sm:text-base transition-colors"
              >
                Create your first order
              </button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
