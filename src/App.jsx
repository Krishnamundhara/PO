import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { DataProvider } from './contexts/DataContext'
import { OfflineProvider } from './contexts/OfflineContext'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import CreatePO from './pages/CreatePO'
import Mills from './pages/Mills'
import Products from './pages/Products'
import Customers from './pages/Customers'
import OrderHistory from './pages/OrderHistory'
import Login from './pages/Login'
import Settings from './pages/Settings'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <OfflineProvider>
          <DataProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/create-po" element={<CreatePO />} />
                <Route path="/mills" element={<Mills />} />
                <Route path="/products" element={<Products />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/history" element={<OrderHistory />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </DataProvider>
        </OfflineProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
