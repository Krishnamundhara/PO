import { FlowButton } from '../components/ui/FlowButton'
import toast from 'react-hot-toast'

export default function FlowButtonDemo() {
  const handleClick = () => {
    toast.success('Flow Button clicked!')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="flex flex-col gap-6">
        <FlowButton text="Flow Button" onClick={handleClick} />
        <FlowButton text="Create Purchase Order" onClick={handleClick} />
        <FlowButton text="Submit" onClick={handleClick} />
      </div>
    </div>
  )
}
