import { ArrowRight } from 'lucide-react';

export function FlowButton({ 
  text = "Modern Button", 
  onClick = () => {},
  children,
  type = 'button',
  fullWidth = false,
  loading = false,
  disabled = false,
  variant = 'primary',
  size = 'md',
  color = 'neutral' // neutral, success, danger, warning, info
}) {
  const widthClass = fullWidth ? 'w-full' : ''
  const displayText = children || text
  
  // Color configurations with rich contrast: border, text, circle, arrows
  const colorConfig = {
    neutral: {
      border: 'border-[#1f2937]/80',
      text: 'text-[#1f2937]',
      circle: 'bg-[#1f2937]',
      arrowStroke: 'stroke-[#1f2937]'
    },
    success: {
      border: 'border-[#059669]/80',
      text: 'text-[#059669]',
      circle: 'bg-[#059669]',
      arrowStroke: 'stroke-[#059669]'
    },
    danger: {
      border: 'border-[#dc2626]/80',
      text: 'text-[#dc2626]',
      circle: 'bg-[#dc2626]',
      arrowStroke: 'stroke-[#dc2626]'
    },
    warning: {
      border: 'border-[#d97706]/80',
      text: 'text-[#d97706]',
      circle: 'bg-[#d97706]',
      arrowStroke: 'stroke-[#d97706]'
    },
    info: {
      border: 'border-[#2563eb]/80',
      text: 'text-[#2563eb]',
      circle: 'bg-[#2563eb]',
      arrowStroke: 'stroke-[#2563eb]'
    }
  }
  
  const config = colorConfig[color] || colorConfig.neutral
  
  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${widthClass} group relative flex items-center gap-1 justify-center overflow-hidden rounded-[100px] border-[1.5px] ${config.border} bg-transparent px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 text-[11px] sm:text-xs md:text-sm font-semibold ${config.text} cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-transparent hover:text-white hover:rounded-[12px] active:scale-[0.95] disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {loading && (
        <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-current absolute"></div>
      )}
      
      {/* Left arrow (arr-2) */}
      <ArrowRight 
        className={`absolute w-3 h-3 sm:w-4 sm:h-4 left-[-25%] fill-none z-[9] group-hover:left-3 sm:group-hover:left-4 group-hover:stroke-white transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${config.arrowStroke}`}
      />

      {/* Text */}
      <span className={`relative z-[1] -translate-x-2 sm:-translate-x-3 group-hover:translate-x-2 sm:group-hover:translate-x-3 transition-all duration-[800ms] ease-out ${loading ? 'opacity-0' : ''}`}>
        {displayText}
      </span>

      {/* Circle */}
      <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 ${config.circle} rounded-[50%] opacity-0 group-hover:w-[180px] group-hover:h-[180px] sm:group-hover:w-[220px] sm:group-hover:h-[220px] group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)]`}></span>

      {/* Right arrow (arr-1) */}
      <ArrowRight 
        className={`absolute w-3 h-3 sm:w-4 sm:h-4 right-3 sm:right-4 fill-none z-[9] group-hover:right-[-25%] group-hover:stroke-white transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${config.arrowStroke}`}
      />
    </button>
  );
}
