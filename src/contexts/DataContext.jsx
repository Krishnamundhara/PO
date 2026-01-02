import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { useOffline } from './OfflineContext'
import { supabase } from '../lib/supabase'
import {
  saveOfflineData,
  getOfflineData,
  addToSyncQueue,
  getSyncQueue,
  removeFromSyncQueue
} from '../lib/offline'

const DataContext = createContext({})

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within DataProvider')
  }
  return context
}

export const DataProvider = ({ children }) => {
  const { user } = useAuth()
  const { isOnline, syncPending, setSyncPending } = useOffline()

  const [mills, setMills] = useState([])
  const [products, setProducts] = useState([])
  const [customers, setCustomers] = useState([])
  const [purchaseOrders, setPurchaseOrders] = useState([])
  const [companyDetails, setCompanyDetails] = useState(null)
  const [loading, setLoading] = useState(false)

  // Fetch all data
  const fetchData = async () => {
    if (!user) return

    setLoading(true)
    try {
      if (isOnline) {
        // Fetch from Supabase
        const [millsRes, productsRes, customersRes, posRes, companyRes] = await Promise.all([
          supabase.from('mills').select('*').eq('user_id', user.id),
          supabase.from('products').select('*').eq('user_id', user.id),
          supabase.from('customers').select('*').eq('user_id', user.id),
          supabase.from('purchase_orders').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
          supabase.from('company_details').select('*').eq('user_id', user.id).single()
        ])

        const data = {
          mills: millsRes.data || [],
          products: productsRes.data || [],
          customers: customersRes.data || [],
          purchaseOrders: posRes.data || [],
          companyDetails: companyRes.data || null
        }

        setMills(data.mills)
        setProducts(data.products)
        setCustomers(data.customers)
        setPurchaseOrders(data.purchaseOrders)
        setCompanyDetails(data.companyDetails)

        // Cache offline
        await saveOfflineData('mills', data.mills)
        await saveOfflineData('products', data.products)
        await saveOfflineData('customers', data.customers)
        await saveOfflineData('purchaseOrders', data.purchaseOrders)
        await saveOfflineData('companyDetails', data.companyDetails)
      } else {
        // Load from offline cache
        const [millsData, productsData, customersData, posData, companyData] = await Promise.all([
          getOfflineData('mills'),
          getOfflineData('products'),
          getOfflineData('customers'),
          getOfflineData('purchaseOrders'),
          getOfflineData('companyDetails')
        ])

        setMills(millsData || [])
        setProducts(productsData || [])
        setCustomers(customersData || [])
        setPurchaseOrders(posData || [])
        setCompanyDetails(companyData || null)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Sync offline changes
  const syncOfflineChanges = async () => {
    if (!isOnline || !user) return

    const queue = await getSyncQueue()
    if (queue.length === 0) {
      setSyncPending(false)
      return
    }

    for (const operation of queue) {
      try {
        const { table, action, data } = operation

        if (action === 'insert') {
          await supabase.from(table).insert({ ...data, user_id: user.id })
        } else if (action === 'update') {
          await supabase.from(table).update(data).eq('id', data.id).eq('user_id', user.id)
        } else if (action === 'delete') {
          await supabase.from(table).delete().eq('id', data.id).eq('user_id', user.id)
        }

        await removeFromSyncQueue(operation.id)
      } catch (error) {
        console.error('Error syncing operation:', error)
      }
    }

    setSyncPending(false)
    await fetchData()
  }

  // CRUD operations
  const addMill = async (mill) => {
    const newMill = { ...mill, id: Date.now().toString() }
    setMills([...mills, newMill])

    if (isOnline) {
      const { data, error } = await supabase
        .from('mills')
        .insert({ ...mill, user_id: user.id })
        .select()
        .single()
      if (error) throw error
      setMills(prev => prev.map(m => m.id === newMill.id ? data : m))
    } else {
      await addToSyncQueue({ table: 'mills', action: 'insert', data: mill })
      await saveOfflineData('mills', [...mills, newMill])
    }
  }

  const updateMill = async (id, updates) => {
    setMills(mills.map(m => m.id === id ? { ...m, ...updates } : m))

    if (isOnline) {
      const { error } = await supabase
        .from('mills')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
      if (error) throw error
    } else {
      await addToSyncQueue({ table: 'mills', action: 'update', data: { id, ...updates } })
      await saveOfflineData('mills', mills.map(m => m.id === id ? { ...m, ...updates } : m))
    }
  }

  const deleteMill = async (id) => {
    setMills(mills.filter(m => m.id !== id))

    if (isOnline) {
      const { error } = await supabase
        .from('mills')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)
      if (error) throw error
    } else {
      await addToSyncQueue({ table: 'mills', action: 'delete', data: { id } })
      await saveOfflineData('mills', mills.filter(m => m.id !== id))
    }
  }

  const addProduct = async (product) => {
    const newProduct = { ...product, id: Date.now().toString() }
    setProducts([...products, newProduct])

    if (isOnline) {
      const { data, error } = await supabase
        .from('products')
        .insert({ ...product, user_id: user.id })
        .select()
        .single()
      if (error) throw error
      setProducts(prev => prev.map(p => p.id === newProduct.id ? data : p))
    } else {
      await addToSyncQueue({ table: 'products', action: 'insert', data: product })
      await saveOfflineData('products', [...products, newProduct])
    }
  }

  const updateProduct = async (id, updates) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updates } : p))

    if (isOnline) {
      const { error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
      if (error) throw error
    } else {
      await addToSyncQueue({ table: 'products', action: 'update', data: { id, ...updates } })
      await saveOfflineData('products', products.map(p => p.id === id ? { ...p, ...updates } : p))
    }
  }

  const deleteProduct = async (id) => {
    setProducts(products.filter(p => p.id !== id))

    if (isOnline) {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)
      if (error) throw error
    } else {
      await addToSyncQueue({ table: 'products', action: 'delete', data: { id } })
      await saveOfflineData('products', products.filter(p => p.id !== id))
    }
  }

  const addCustomer = async (customer) => {
    const newCustomer = { ...customer, id: Date.now().toString() }
    setCustomers([...customers, newCustomer])

    if (isOnline) {
      const { data, error } = await supabase
        .from('customers')
        .insert({ ...customer, user_id: user.id })
        .select()
        .single()
      if (error) throw error
      setCustomers(prev => prev.map(c => c.id === newCustomer.id ? data : c))
    } else {
      await addToSyncQueue({ table: 'customers', action: 'insert', data: customer })
      await saveOfflineData('customers', [...customers, newCustomer])
    }
  }

  const updateCustomer = async (id, updates) => {
    setCustomers(customers.map(c => c.id === id ? { ...c, ...updates } : c))

    if (isOnline) {
      const { error } = await supabase
        .from('customers')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
      if (error) throw error
    } else {
      await addToSyncQueue({ table: 'customers', action: 'update', data: { id, ...updates } })
      await saveOfflineData('customers', customers.map(c => c.id === id ? { ...c, ...updates } : c))
    }
  }

  const deleteCustomer = async (id) => {
    setCustomers(customers.filter(c => c.id !== id))

    if (isOnline) {
      const { error } = await supabase
        .from('customers')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)
      if (error) throw error
    } else {
      await addToSyncQueue({ table: 'customers', action: 'delete', data: { id } })
      await saveOfflineData('customers', customers.filter(c => c.id !== id))
    }
  }

  const addPurchaseOrder = async (po) => {
    const newPO = { ...po, id: Date.now().toString(), created_at: new Date().toISOString() }
    setPurchaseOrders([newPO, ...purchaseOrders])

    if (isOnline) {
      const { data, error } = await supabase
        .from('purchase_orders')
        .insert({ ...po, user_id: user.id })
        .select()
        .single()
      if (error) throw error
      setPurchaseOrders(prev => prev.map(p => p.id === newPO.id ? data : p))
    } else {
      await addToSyncQueue({ table: 'purchase_orders', action: 'insert', data: po })
      await saveOfflineData('purchaseOrders', [newPO, ...purchaseOrders])
    }
  }

  const updatePO = async (id, updates) => {
    setPurchaseOrders(purchaseOrders.map(po => po.id === id ? { ...po, ...updates } : po))

    if (isOnline) {
      const { error } = await supabase
        .from('purchase_orders')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
      if (error) throw error
    } else {
      await addToSyncQueue({ table: 'purchase_orders', action: 'update', data: { id, ...updates } })
      await saveOfflineData('purchaseOrders', purchaseOrders.map(po => po.id === id ? { ...po, ...updates } : po))
    }
  }

  const updateCompanyDetails = async (details) => {
    setCompanyDetails(details)

    if (isOnline) {
      try {
        // First, try to get existing company details
        const { data: existing } = await supabase
          .from('company_details')
          .select('id')
          .eq('user_id', user.id)
          .single()

        if (existing) {
          // Update existing record
          const { error } = await supabase
            .from('company_details')
            .update(details)
            .eq('user_id', user.id)
          if (error) throw error
        } else {
          // Insert new record
          const { error } = await supabase
            .from('company_details')
            .insert({ ...details, user_id: user.id })
          if (error) throw error
        }
      } catch (error) {
        throw error
      }
    } else {
      await addToSyncQueue({ table: 'company_details', action: 'update', data: details })
      await saveOfflineData('companyDetails', details)
    }
  }

  useEffect(() => {
    fetchData()
  }, [user, isOnline])

  useEffect(() => {
    if (syncPending) {
      syncOfflineChanges()
    }
  }, [syncPending])

  const value = {
    mills,
    products,
    customers,
    purchaseOrders,
    companyDetails,
    loading,
    addMill,
    updateMill,
    deleteMill,
    addProduct,
    updateProduct,
    deleteProduct,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    addPurchaseOrder,
    updatePO,
    updateCompanyDetails,
    refreshData: fetchData
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}
