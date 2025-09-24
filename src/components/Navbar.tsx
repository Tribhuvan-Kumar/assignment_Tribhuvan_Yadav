'use client'
import { memo } from 'react'

const Navbar = memo(() => {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SE</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">SolveEase</span>
          </div>

          {/* Other menu if HR wants */}
        </div>
      </div>
    </nav>
  )
})

Navbar.displayName = 'Navbar'
export default Navbar
