interface StatsCardProps {
  title: string
  value: number | string
  subtitle?: string
  icon: React.ReactNode
  color: 'blue' | 'green' | 'purple' | 'yellow' | 'red' | 'indigo'
  trend?: {
    value: string
    isPositive: boolean
  }
}

const colorClasses = {
  blue: {
    bg: 'bg-gradient-to-br from-[#2d5016]/5 to-[#3d6b1f]/10',
    border: 'border-[#2d5016]',
    text: 'text-[#2d5016]',
    icon: 'text-[#2d5016]'
  },
  green: {
    bg: 'bg-gradient-to-br from-[#3d6b1f]/5 to-[#2d5016]/10',
    border: 'border-[#3d6b1f]',
    text: 'text-[#3d6b1f]',
    icon: 'text-[#3d6b1f]'
  },
  purple: {
    bg: 'bg-gradient-to-br from-[#d4af37]/10 to-[#f4d03f]/10',
    border: 'border-[#d4af37]',
    text: 'text-[#d4af37]',
    icon: 'text-[#d4af37]'
  },
  yellow: {
    bg: 'bg-gradient-to-br from-[#f4d03f]/10 to-[#d4af37]/10',
    border: 'border-[#f4d03f]',
    text: 'text-[#d4af37]',
    icon: 'text-[#f4d03f]'
  },
  red: {
    bg: 'bg-red-50',
    border: 'border-red-500',
    text: 'text-red-700',
    icon: 'text-red-500'
  },
  indigo: {
    bg: 'bg-gradient-to-br from-[#2d5016]/10 to-[#d4af37]/10',
    border: 'border-[#2d5016]',
    text: 'text-[#2d5016]',
    icon: 'text-[#d4af37]'
  }
}

export default function StatsCard({ title, value, subtitle, icon, color, trend }: StatsCardProps) {
  const colors = colorClasses[color]

  return (
    <div className={`${colors.bg} border-l-4 ${colors.border} rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-600 mb-2">{title}</p>
          <p className={`text-3xl font-bold ${colors.text} mb-1`}>{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-500">{subtitle}</p>
          )}
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-xs font-semibold ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {trend.isPositive ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                )}
              </svg>
              <span>{trend.value}</span>
            </div>
          )}
        </div>
        <div className={`${colors.icon} opacity-80`}>
          {icon}
        </div>
      </div>
    </div>
  )
}
