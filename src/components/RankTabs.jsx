import React from 'react'

const RankTabs = ({ periods, currentPeriod, sortOptions, sortBy, onPeriodChange, onSortChange }) => {
  return (
    <div className="mb-8 space-y-4">
      {/* 周期选择 */}
      <div className="flex flex-wrap items-center gap-4">
        <span className="text-gray-400 text-sm">排行榜：</span>
        <div className="flex flex-wrap gap-2">
          {periods.map((period) => (
            <button
              key={period.id}
              onClick={() => onPeriodChange(period.id)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                ${currentPeriod === period.id
                  ? 'bg-primary-500 text-white shadow-neon'
                  : 'bg-dark-800/50 text-gray-400 hover:bg-dark-800 hover:text-white border border-gray-800/50'
                }
              `}
            >
              {period.name}
            </button>
          ))}
        </div>
      </div>

      {/* 排序选择 */}
      <div className="flex flex-wrap items-center gap-4">
        <span className="text-gray-400 text-sm">排序方式：</span>
        <div className="flex flex-wrap gap-2">
          {sortOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => onSortChange(option.id)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                ${sortBy === option.id
                  ? 'bg-accent-500 text-white shadow-neon'
                  : 'bg-dark-800/50 text-gray-400 hover:bg-dark-800 hover:text-white border border-gray-800/50'
                }
              `}
            >
              {option.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RankTabs
