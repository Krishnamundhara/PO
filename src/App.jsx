import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'
import { DataProvider } from './contexts/DataContext'
import { OfflineProvider } from './contexts/OfflineContext'
import { ThemeProvider } from './contexts/ThemeContext'
import Layout from './components/Layout'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Loading from './components/Loading'

// Lazy load page components for code splitting
const Dashboard = lazy(() => import('./pages/Dashboard'))
const CreatePO = lazy(() => import('./pages/CreatePO'))
const Mills = lazy(() => import('./pages/Mills'))
const Products = lazy(() => import('./pages/Products'))
const Customers = lazy(() => import('./pages/Customers'))
const OrderHistory = lazy(() => import('./pages/OrderHistory'))
const Settings = lazy(() => import('./pages/Settings'))
const FlowButtonDemo = lazy(() => import('./pages/FlowButtonDemo'))

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <AuthProvider>
          <OfflineProvider>
            <DataProvider>
              <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                <Route path="/" element={
                  <Suspense fallback={<Loading />}>
                    <Dashboard />
                  </Suspense>
                } />
                <Route path="/create-po" element={
                  <Suspense fallback={<Loading />}>
                    <CreatePO />
                  </Suspense>
                } />
                <Route path="/mills" element={
                  <Suspense fallback={<Loading />}>
                    <Mills />
                  </Suspense>
                } />
                <Route path="/products" element={
                  <Suspense fallback={<Loading />}>
                    <Products />
                  </Suspense>
                } />
                <Route path="/customers" element={
                  <Suspense fallback={<Loading />}>
                    <Customers />
                  </Suspense>
                } />
                <Route path="/history" element={
                  <Suspense fallback={<Loading />}>
                    <OrderHistory />
                  </Suspense>
                } />
                <Route path="/settings" element={
                  <Suspense fallback={<Loading />}>
                    <Settings />
                  </Suspense>
                } />
                <Route path="/flow-button-demo" element={
                  <Suspense fallback={<Loading />}>
                    <FlowButtonDemo />
                  </Suspense>
                } />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </DataProvider>
        </OfflineProvider>
      </AuthProvider>
    </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
