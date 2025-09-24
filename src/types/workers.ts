export interface WorkerType {
  id: number
  name: string
  service: string
  pricePerDay: number
  image: string
}

export interface FilterState {
  service: string
  minPrice: number
  maxPrice: number
}

export interface PaginationState {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

export interface APIResponse<T> {
  success: boolean
  data: T
  error?: string
}
