import React from 'react'

const CategoryNav = ({ categories, currentCategory, onSelect }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelect(category.id)}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap
              transition-all duration-300 group relative overflow-hidden
              ${currentCategory === category.id
                ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-neon'
                : 'bg-dark-800/50 text-gray-400 hover:bg-dark-800 hover:text-white border border-gray-800/50'
              }
            `}
          >
            {currentCategory === category.id && (
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-white/20 to-primary-500/0 animate-pulse" />
            )}
            <span className="relative z-10">{category.icon}</span>
            <span className="relative z-10">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategoryNav
