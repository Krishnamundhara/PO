// React and form libraries
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

// Custom contexts
import { useAuth } from '../contexts/AuthContext'
import { useData } from '../contexts/DataContext'
import { useTheme } from '../contexts/ThemeContext'

// Validation schema
import { companyDetailsSchema } from '../lib/validation'

// UI Components
import { FlowButton } from '../components/ui/FlowButton'
import Input from '../components/Input'
import Textarea from '../components/Textarea'
import Card from '../components/Card'

// Icons from lucide-react
import { Building2, Upload, X, Sun, Moon } from 'lucide-react'

export default function Settings() {
  const { signOut } = useAuth()
  const { companyDetails, updateCompanyDetails } = useData()
  const { theme, toggleTheme, isDark } = useTheme()
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [logoPreview, setLogoPreview] = useState(companyDetails?.logo || null)
  const [uploadError, setUploadError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: zodResolver(companyDetailsSchema),
    defaultValues: companyDetails || {}
  })

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadError('')

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select an image file')
      return
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setUploadError('File size must be less than 2MB')
      return
    }

    try {
      // Convert to base64 and compress image
      const reader = new FileReader()
      reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
          // Create canvas and compress image
          const canvas = document.createElement('canvas')
          const maxWidth = 500
          const maxHeight = 500
          let width = img.width
          let height = img.height

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width
              width = maxWidth
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height
              height = maxHeight
            }
          }

          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0, width, height)

          // Convert to base64 with compression
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8)
          
          // Check size after compression
          if (compressedBase64.length > 500000) {
            setUploadError('Compressed image still too large. Please use a smaller image.')
            return
          }

          setLogoPreview(compressedBase64)
          setValue('logo', compressedBase64)
        }
        img.src = event.target?.result
      }
      reader.readAsDataURL(file)
    } catch (error) {
      setUploadError('Failed to upload logo')
    }
  }

  const removeLogo = () => {
    setLogoPreview(null)
    setValue('logo', '')
  }

  const onSubmit = async (data) => {
    setSubmitting(true)
    try {
      await updateCompanyDetails(data)
      toast.success('Company details updated successfully')
    } catch (error) {
      console.error('Error updating company details:', error)
      toast.error('Failed to update company details')
    } finally {
      setSubmitting(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <div className="container-mobile py-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <Card className="mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isDark ? <Moon size={24} className="text-primary-400" /> : <Sun size={24} className="text-primary-600" />}
            <div>
              <h2 className="text-lg font-semibold">Theme</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {isDark ? 'Dark mode is on' : 'Light mode is on'}
              </p>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
              isDark ? 'bg-primary-600' : 'bg-gray-300'
            }`}
            aria-label="Toggle theme"
          >
            <span
              className={`inline-flex h-5 w-5 transform items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 ${
                isDark ? 'translate-x-8' : 'translate-x-1'
              }`}
            >
              {isDark ? <Moon size={12} className="text-primary-600" /> : <Sun size={12} className="text-yellow-500" />}
            </span>
          </button>
        </div>
      </Card>

      <Card className="mb-4">
        <div className="flex items-center gap-3 mb-4">
          <Building2 size={24} className="text-primary-600 dark:text-primary-400" />
          <h2 className="text-lg font-semibold">Company Details</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Company Name"
            required
            {...register('name')}
            error={errors.name?.message}
          />

          <Textarea
            label="Address"
            rows={3}
            {...register('address')}
            error={errors.address?.message}
          />

          <Input
            label="Bank Name"
            {...register('bank_name')}
            error={errors.bank_name?.message}
          />

          <Input
            label="Account Number"
            {...register('account_number')}
            error={errors.account_number?.message}
          />

          <Input
            label="IFSC Code"
            {...register('ifsc_code')}
            error={errors.ifsc_code?.message}
          />

          <Input
            label="Branch"
            {...register('branch')}
            error={errors.branch?.message}
          />

          {/* Logo Upload Section */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Logo</label>
            
            {logoPreview && (
              <div className="relative inline-block">
                <img 
                  src={logoPreview} 
                  alt="Logo preview" 
                  className="h-24 w-24 object-contain border border-gray-200 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                />
                <button
                  type="button"
                  onClick={removeLogo}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X size={14} />
                </button>
              </div>
            )}

            {uploadError && (
              <p className="text-sm text-red-600 dark:text-red-400">{uploadError}</p>
            )}

            <div className="flex gap-2">
              <label className="flex-1">
                <div className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary-500 dark:hover:border-primary-400 cursor-pointer transition">
                  <Upload size={18} className="text-gray-600 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Choose Image</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </label>
            </div>
            
            <p className="text-xs text-gray-500 dark:text-gray-400">
              PNG, JPG, or GIF. Max 2MB.
            </p>
          </div>

          <Input
            label="Logo URL (Optional)"
            type="url"
            placeholder="https://example.com/logo.png"
            {...register('logo')}
            error={errors.logo?.message}
          />

          <FlowButton type="submit" fullWidth loading={submitting} text="Save Company Details" color="success" />
        </form>
      </Card>


      <Card>
        <h2 className="text-lg font-semibold mb-4">Account</h2>
        <FlowButton
          fullWidth
          onClick={handleSignOut}
          text="Sign Out"
          color="danger"
        />
      </Card>

      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>PO Generator v1.0.0</p>
        <p className="mt-1">Mobile-first Purchase Order Management</p>
      </div>
    </div>
  )
}
