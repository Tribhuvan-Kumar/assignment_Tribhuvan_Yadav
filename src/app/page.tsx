'use client'
import { WorkerType, FilterState, PaginationState, APIResponse } from '@/types/workers'
import { useState, useEffect, useCallback, useMemo } from 'react'
import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import WorkerCard from '@/components/WorkerCard'
import SkeletonCard from '@/components/SkeletonCard'
import Pagination from '@/components/Pagination'
import ErrorBoundary from '@/components/ErrorBoundary'

// Lazy load components for better performance
const DynamicFilterBar = dynamic(() => import('@/components/FilterBar'), {
  loading: () => <div className="h-32 bg-gray-100 rounded-xl animate-pulse mb-8" />
})

export default function WorkersPage() {
  // State management
  const [workersData, setWorkersData] = useState<WorkerType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    service: '',
    minPrice: 0,
    maxPrice: 10000
  })

  // Pagination state
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    itemsPerPage: 12,
    totalItems: 0,
    totalPages: 0
  })

  // Cache for API calls to prevent redundant requests
  const [cache, setCache] = useState<Map<string, { data: WorkerType[], timestamp: number }>>(new Map())

  // Removed duplicate loadData() call
  const fetchWorkers = useCallback(async () => {
    const cacheKey = 'workers-data'
    const cached = cache.get(cacheKey)
    const CACHE_DURATION = 5 * 60 * 1000

    // Check if we have valid cached data
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      setWorkersData(cached.data)
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      // Corrected API path from /api/wprkers to /api/workers
      const response = await fetch('/api/workers', {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch workers: ${response.status}`)
      }

      const result: APIResponse<WorkerType[]> = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch workers')
      }

      // Filter out invalid workers and sort by name
      const validWorkers = result.data
        .filter(worker => worker.pricePerDay > 0 && worker.id !== null)
        .sort((a, b) => a.name.localeCompare(b.name))

      setWorkersData(validWorkers)

      // Update cache
      setCache(prev => new Map(prev.set(cacheKey, {
        data: validWorkers,
        timestamp: Date.now()
      })))

      // Update price filter range based on actual data
      if (validWorkers.length > 0) {
        const prices = validWorkers.map(w => w.pricePerDay)
        const minPrice = Math.min(...prices)
        const maxPrice = Math.max(...prices)

        setFilters(prev => ({
          ...prev,
          minPrice: Math.floor(minPrice / 100) * 100,
          maxPrice: Math.ceil(maxPrice / 100) * 100
        }))
      }

    } catch (err) {
      console.error('Failed to load workers:', err)
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }, [cache])

  // Filter and paginate workers - Memoized
  const filteredAndPaginatedWorkers = useMemo(() => {
    // Apply filters
    const filtered = workersData.filter(worker => {
      const serviceMatch = !filters.service || worker.service === filters.service
      const priceMatch = worker.pricePerDay >= filters.minPrice && worker.pricePerDay <= filters.maxPrice
      return serviceMatch && priceMatch
    })

    // Update pagination info
    const totalItems = filtered.length
    const totalPages = Math.ceil(totalItems / pagination.itemsPerPage)

    // Update pagination state if needed
    setPagination(prev => ({
      ...prev,
      totalItems,
      totalPages,
      currentPage: Math.min(prev.currentPage, totalPages || 1)
    }))

    // Apply pagination
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage
    const endIndex = startIndex + pagination.itemsPerPage
    const paginatedWorkers = filtered.slice(startIndex, endIndex)

    return {
      workers: paginatedWorkers,
      totalItems,
      totalPages
    }
  }, [workersData, filters, pagination.currentPage, pagination.itemsPerPage])

  // Handle filter changes
  const handleFiltersChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters)
    setPagination(prev => ({ ...prev, currentPage: 1 }))
  }, [])

  // Handle page changes
  const handlePageChange = useCallback((page: number) => {
    setPagination(prev => ({ ...prev, currentPage: page }))

    // Smooth scroll to top of results
    const element = document.getElementById('workers-grid');
    if (element) {
      const offset = 200;
      const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, [])

  // Load data on component mount
  useEffect(() => {
    fetchWorkers()
  }, [fetchWorkers])

  // Error fallback component
  const ErrorFallback = () => (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to load workers</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={fetchWorkers}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  )

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        {/* Sticky navbar */}
        <Navbar />

        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Find Professional Workers
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect with skilled professionals for all your service needs
            </p>
          </div>

          {/* Filters */}
          <DynamicFilterBar
            filters={filters}
            onFiltersChange={handleFiltersChange}
            workers={workersData}
            isLoading={loading}
          />

          {/* Error State */}
          {error && !loading && <ErrorFallback />}

          {/* Loading State - with Skeleton screens */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="workers-grid">
              {Array.from({ length: 12 }, (_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {/* Workers Grid */}
          {!loading && !error && (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">
                  Showing {filteredAndPaginatedWorkers.workers.length} of {filteredAndPaginatedWorkers.totalItems} workers
                </p>
                <div className="text-sm text-gray-500">
                  Page {pagination.currentPage} of {filteredAndPaginatedWorkers.totalPages}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8" id="workers-grid">
                {filteredAndPaginatedWorkers.workers.map((worker, index) => (
                  <WorkerCard
                    key={worker.id}
                    worker={worker}
                    isFirst={index < 4}
                  />
                ))}
              </div>

              {/* No Results State */}
              {filteredAndPaginatedWorkers.workers.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No workers found</h3>
                  <p className="text-gray-500 mb-4">Try adjusting your filters to see more results</p>
                  <button
                    onClick={() => handleFiltersChange({ service: '', minPrice: 0, maxPrice: 10000 })}
                    className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}

              {/* Pagination */}
              <Pagination
                pagination={{
                  ...pagination,
                  totalItems: filteredAndPaginatedWorkers.totalItems,
                  totalPages: filteredAndPaginatedWorkers.totalPages
                }}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </main>
      </div>
    </ErrorBoundary>
  )
}
