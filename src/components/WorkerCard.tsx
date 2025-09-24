'use client'
import Image from 'next/image'
import { memo } from 'react'
import { WorkerType } from '@/types/workers'

interface WorkerCardProps {
    worker: WorkerType
    isFirst: boolean
}

const WorkerCard = memo(({ worker, isFirst }: WorkerCardProps) => {
    const formattedPrice = Math.round(worker.pricePerDay * 1.18)

    return (
        <div className="group border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white hover:shadow-lg hover:border-blue-300 transition-all duration-300 hover:-translate-y-1">
            <div className="w-full h-48 relative overflow-hidden">
                <Image
                    src={worker.image ?? '/user.webp'}
                    alt={`${worker.name} - ${worker.service} specialist`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    priority={isFirst}
                    loading={isFirst ? 'eager' : 'lazy'}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
            </div>

            <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {worker.name}
                </h2>
                <p className="text-gray-600 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    {worker.service}
                </p>
                <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-gray-900">
                        ₹{formattedPrice.toLocaleString()}
                        <span className="text-sm font-normal text-gray-500"> / day</span>
                    </p>
                    {/* <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            Contact
          </button> */}
                </div>
            </div>
        </div>
    )
})

WorkerCard.displayName = 'WorkerCard'
export default WorkerCard
