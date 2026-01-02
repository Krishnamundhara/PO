import localforage from 'localforage'

// Initialize localforage instances
export const offlineStore = localforage.createInstance({
  name: 'po-generator',
  storeName: 'offline_data'
})

export const syncQueue = localforage.createInstance({
  name: 'po-generator',
  storeName: 'sync_queue'
})

export const draftStore = localforage.createInstance({
  name: 'po-generator',
  storeName: 'drafts'
})

// Offline data management
export const saveOfflineData = async (key, data) => {
  try {
    await offlineStore.setItem(key, data)
    return true
  } catch (error) {
    console.error('Error saving offline data:', error)
    return false
  }
}

export const getOfflineData = async (key) => {
  try {
    return await offlineStore.getItem(key)
  } catch (error) {
    console.error('Error getting offline data:', error)
    return null
  }
}

// Sync queue management
export const addToSyncQueue = async (operation) => {
  try {
    const queue = await syncQueue.getItem('queue') || []
    queue.push({
      ...operation,
      id: Date.now(),
      timestamp: new Date().toISOString()
    })
    await syncQueue.setItem('queue', queue)
    return true
  } catch (error) {
    console.error('Error adding to sync queue:', error)
    return false
  }
}

export const getSyncQueue = async () => {
  try {
    return await syncQueue.getItem('queue') || []
  } catch (error) {
    console.error('Error getting sync queue:', error)
    return []
  }
}

export const clearSyncQueue = async () => {
  try {
    await syncQueue.setItem('queue', [])
    return true
  } catch (error) {
    console.error('Error clearing sync queue:', error)
    return false
  }
}

export const removeFromSyncQueue = async (id) => {
  try {
    const queue = await syncQueue.getItem('queue') || []
    const newQueue = queue.filter(item => item.id !== id)
    await syncQueue.setItem('queue', newQueue)
    return true
  } catch (error) {
    console.error('Error removing from sync queue:', error)
    return false
  }
}

// Draft management
export const saveDraft = async (type, data) => {
  try {
    await draftStore.setItem(type, {
      data,
      timestamp: new Date().toISOString()
    })
    return true
  } catch (error) {
    console.error('Error saving draft:', error)
    return false
  }
}

export const getDraft = async (type) => {
  try {
    return await draftStore.getItem(type)
  } catch (error) {
    console.error('Error getting draft:', error)
    return null
  }
}

export const clearDraft = async (type) => {
  try {
    await draftStore.removeItem(type)
    return true
  } catch (error) {
    console.error('Error clearing draft:', error)
    return false
  }
}
