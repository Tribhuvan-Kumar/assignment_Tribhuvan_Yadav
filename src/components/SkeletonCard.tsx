import { memo } from 'react'

const SkeletonCard = memo(() => {
  return (
    <div className="border rounded-xl overflow-hidden shadow-sm bg-white animate-pulse">
      <div className="w-full h-48 bg-gray-200"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-200 rounded-md mb-3"></div>
        <div className="h-4 bg-gray-200 rounded-md w-2/3 mb-3"></div>
        <div className="h-5 bg-gray-200 rounded-md w-1/2"></div>
      </div>
    </div>
  )
})

SkeletonCard.displayName = 'SkeletonCard'
export default SkeletonCard
