'use client'
import { memo } from 'react'
import { PaginationState } from '@/types/workers'

interface PaginationProps {
    pagination: PaginationState
    onPageChange: (page: number) => void
}

const Pagination = memo(({ pagination, onPageChange }: PaginationProps) => {
    const { currentPage, totalPages } = pagination

    if (totalPages <= 1) return null

    const getPageNumbers = () => {
        if (totalPages <= 3) {
            return Array.from({ length: totalPages }, (_, i) => i + 1)
        }

        let start = currentPage - 1
        let end = currentPage + 1

        // Adjust if we're too close to the beginning
        if (start < 1) {
            start = 1
            end = 3
        }

        // Adjust if we're too close to the end
        if (end > totalPages) {
            end = totalPages
            start = totalPages - 2
        }

        const pages: number[] = []
        for (let i = start; i <= end; i++) {
            pages.push(i)
        }

        return pages
    }

    return (
        <div className="flex items-center justify-center space-x-2 mt-8">
            {/* Previous Button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium cursor-pointer text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                Previous
            </button>

            {/* Page Numbers */}
            {getPageNumbers().map((page, index) => (
                <button
                    key={index}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-2 text-sm font-medium cursor-pointer rounded-lg transition-colors ${
                        page === currentPage
                            ? 'bg-blue-600 text-white border border-blue-600'
                            : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                >
                    {page}
                </button>
            ))}

            {/* Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium cursor-pointer text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                Next
            </button>
        </div>
    )
})

Pagination.displayName = 'Pagination'
export default Pagination
