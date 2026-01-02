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
    <div className="container-mobile py-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">{purchaseOrders.length}</div>
            <div className="text-sm text-gray-600 mt-1">Total Orders</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{mills.length}</div>
            <div className="text-sm text-gray-600 mt-1">Mills</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{products.length}</div>
            <div className="text-sm text-gray-600 mt-1">Products</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">{customers.length}</div>
            <div className="text-sm text-gray-600 mt-1">Customers</div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map(({ icon: Icon, label, path, color }) => (
            <Card
              key={path}
              onClick={() => navigate(path)}
              className="cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col items-center text-center p-4">
                <div className={`${color} text-white p-3 rounded-full mb-3`}>
                  <Icon size={24} />
                </div>
                <span className="font-medium">{label}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Orders</h2>
          <button
            onClick={() => navigate('/history')}
            className="text-primary-600 text-sm hover:text-primary-700"
          >
            View All
          </button>
        </div>
        {recentOrders.length > 0 ? (
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <Card key={order.id} onClick={() => navigate('/history')}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-medium text-primary-600">PO #{order.po_number}</div>
                    <div className="text-sm text-gray-600 mt-1">{order.party_name}</div>
                    <div className="text-xs text-gray-500 mt-1">{order.product}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">{formatDate(order.date)}</div>
                    <div className="text-xs text-gray-400 mt-1">{order.mill}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <div className="text-center py-8 text-gray-500">
              <FilePlus size={48} className="mx-auto mb-2 text-gray-400" />
              <p>No orders yet</p>
              <button
                onClick={() => navigate('/create-po')}
                className="text-primary-600 hover:text-primary-700 mt-2"
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
