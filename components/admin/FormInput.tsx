interface FormInputProps {
  label: string
  type?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  icon?: React.ReactNode
  rows?: number
}

export default function FormInput({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  icon,
  rows
}: FormInputProps) {
  const isTextarea = type === 'textarea'

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        
        {isTextarea ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required={required}
            rows={rows || 4}
            className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all bg-white text-gray-900 placeholder-gray-400 ${
              icon ? 'pl-11' : ''
            }`}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required={required}
            className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2d5016] focus:border-[#2d5016] transition-all bg-white text-gray-900 placeholder-gray-400 ${
              icon ? 'pl-11' : ''
            }`}
          />
        )}
      </div>
    </div>
  )
}
