export const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

export const formatCurrency = (amount) => {
  if (!amount) return '0'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2
  }).format(amount)
}

export const generatePONumber = (lastPONumber) => {
  if (!lastPONumber) return '1'
  const num = parseInt(lastPONumber) || 0
  return String(num + 1)
}

export const calculateTotal = (rate, quantity) => {
  const r = parseFloat(rate) || 0
  const q = parseFloat(quantity) || 0
  return r * q
}

export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export const truncateText = (text, maxLength) => {
  if (!text || text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}
