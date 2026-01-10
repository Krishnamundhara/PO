import { useNavigate } from 'react-router-dom'
import { useData } from '../contexts/DataContext'
import Card from '../components/Card'
import { FlowButton } from '../components/ui/FlowButton'
import { BarChart3, Plus, Archive, Eye, Sparkles } from 'lucide-react'

export default function Manager() {
  const navigate = useNavigate()
  const { qualityRecords } = useData()

  const stats = [
    
    {
      label: 'Quality Records',
      value: qualityRecords.length,
      icon: Archive,
      color: 'bg-green-500'
    },
    
  ]

  const quickActions = [
    
    
    {
      title: 'Create Quality Record',
      description: 'Record quality specifications',
      icon: Plus,
      path: '/create-quality',
      color: 'success'
    },
    {
      title: 'View Quality Records',
      description: 'View all quality records',
      icon: Archive,
      path: '/quality-records',
      color: 'warning'
    },
  ]

  return (
    <div className="container-mobile py-4 sm:py-6">
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
        <div className="p-2 sm:p-3 bg-indigo-500 rounded-full text-white">
          <BarChart3 size={20} className="sm:w-6 sm:h-6" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Manager Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-0.5 sm:mt-1">Manage all your operations</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">{stat.label}</p>
                    <p className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2 text-gray-900 dark:text-white">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-1.5 sm:p-2 rounded-lg text-white`}>
                    <Icon size={16} className="sm:w-5 sm:h-5" />
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Quick Actions Section */}
      <div>
        <h2 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <Card key={index} className="flex flex-col h-full">
                <div className="flex items-start justify-between mb-2 sm:mb-3">
                  <div className="p-1.5 sm:p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg text-indigo-600 dark:text-indigo-400">
                    <Icon size={18} className="sm:w-5 sm:h-5" />
                  </div>
                </div>
                <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white mb-0.5 sm:mb-1">{action.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 flex-1">{action.description}</p>
                <FlowButton
                  fullWidth
                  text="Open"
                  color={action.color}
                  onClick={() => navigate(action.path)}
                />
              </Card>
            )
          })}
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="mt-6 sm:mt-8">
        <h2 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Recent Activity</h2>
        <Card>
          {qualityRecords.length > 0 ? (
            <div className="space-y-2 sm:space-y-3">
              {/* Recent Quality Records */}
              <div>
                <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white mb-2">Recent Quality Records</h3>
                <div className="space-y-1.5 sm:space-y-2">
                  {qualityRecords.slice(0, 3).map((quality) => (
                    <div key={quality.id} className="flex justify-between items-center p-2 rounded bg-gray-50 dark:bg-gray-800">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm sm:text-base text-gray-900 dark:text-white">SR #{quality.sr_no}</p>
                        <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 truncate">{quality.quality}</p>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-green-600 dark:text-green-400 ml-2">₹{quality.rate}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 sm:py-8">
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">No recent activity</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
