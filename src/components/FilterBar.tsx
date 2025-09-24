'use client'
import { memo, useMemo } from 'react'
import { FilterState, WorkerType } from '@/types/workers'

interface FilterBarProps {
    filters: FilterState
    onFiltersChange: (filters: FilterState) => void
    workers: WorkerType[]
    isLoading: boolean
}

const FilterBar = memo(({ filters, onFiltersChange, workers, isLoading }: FilterBarProps) => {
    // Extract unique services and price ranges
    const { services, priceRange } = useMemo(() => {
        if (!workers.length) return { services: [], priceRange: { min: 0, max: 10000 } }

        const uniqueServices = Array.from(new Set(workers.map(w => w.service))).sort()
        const prices = workers.map(w => w.pricePerDay)
        const minPrice = Math.min(...prices)
        const maxPrice = Math.max(...prices)

        return {
            services: uniqueServices,
            priceRange: { min: Math.floor(minPrice / 100) * 100, max: Math.ceil(maxPrice / 100) * 100 }
        }
    }, [workers])

    const handleServiceChange = (service: string) => {
        onFiltersChange({ ...filters, service })
    }

    const handlePriceChange = (field: 'minPrice' | 'maxPrice', value: number) => {
        onFiltersChange({ ...filters, [field]: value })
    }

    const clearFilters = () => {
        onFiltersChange({
            service: '',
            minPrice: priceRange.min,
            maxPrice: priceRange.max
        })
    }

    if (isLoading) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="h-10 bg-gray-200 rounded"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Filter Workers</h3>
                <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                    Clear All
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Service Filter */}
                <div>
                    <label htmlFor='filters-service' className="block text-sm font-medium text-gray-700 mb-2">
                        Service Type
                    </label>
                    <select
                        id='filters-service'
                        value={filters.service}
                        onChange={(e) => handleServiceChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 outline-0 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                        <option value="" className='bg-blue-50'>All Services</option>
                        {services.map((service) => (
                            <option key={service} value={service} className='bg-blue-50'>
                                {service}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Min Price Filter */}
                <div>
                    <label htmlFor='filters-minPrice' className="block text-sm font-medium text-gray-700 mb-2">
                        Min Price (₹/day)
                    </label>
                    <input
                        type="number"
                        id='filters-minPrice'
                        value={filters.minPrice}
                        onChange={(e) => handlePriceChange('minPrice', Number(e.target.value))}
                        min={priceRange.min}
                        max={priceRange.max}
                        step="100"
                        className="w-full px-3 py-2 outline-0 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                </div>

                {/* Max Price Filter */}
                <div>
                    <label htmlFor='filters-maxPrice' className="block text-sm font-medium text-gray-700 mb-2">
                        Max Price (₹/day)
                    </label>
                    <input
                        type="number"
                        id='filters-maxPrice'
                        value={filters.maxPrice}
                        onChange={(e) => handlePriceChange('maxPrice', Number(e.target.value))}
                        min={priceRange.min}
                        max={priceRange.max}
                        step="100"
                        className="w-full px-3 py-2 outline-0 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                </div>
            </div>
        </div>
    )
})

FilterBar.displayName = 'FilterBar'
export default FilterBar
