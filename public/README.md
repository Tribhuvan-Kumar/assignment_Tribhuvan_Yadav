# SolveEase Workers Platform

A modern, responsive workers platform built with Next.js, and TypeScript. Find and connect with skilled professionals across various service categories with advanced filtering and pagination features.

## ✨ Features

- **🔍 Advanced Filtering**: Filter workers by service type and price range
- **📄 Smart Pagination**: Navigate through results with 3-page pagination system
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **🎨 Modern UI**: Clean, professional interface with smooth animations
- **⚡ Performance Optimized**: Lazy loading, memoization, and skeleton screens
- **🛡️ Error Handling**: Comprehensive error boundaries and user feedback
- **🔗 API Integration**: RESTful API with loading states and caching
- **♿ Accessibility**: WCAG compliant with proper ARIA attributes

## 🛠️ Tech Stack

- **Framework**: Next.js 14+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks (useState, useEffect, useMemo, useCallback)
- **Performance**: React.memo, dynamic imports, image optimization
- **Development**: ESLint, Git

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Tribhuvan-Kumar/assignment_Tribhuvan_Yadav.git
cd assignment_Tribhuvan_Yadav
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── workers/
│   │   │   └── route.ts          # Workers API endpoint
│   │   └── services/
│   │       └── route.ts          # Services API endpoint
│   ├── layout.tsx                # App layout with metadata
│   └── page.tsx                  # Main workers page
├── components/
│   ├── ErrorBoundary.tsx         # All UI components
│   ├── FilterBar.tsx
│   ├── Navbar.tsx
│   ├── Pagination.tsx
│   ├── SkeletonCard.tsx
│   └── WorkerCard.tsx
├── types/
│   └── workers.ts               # TypeScript interfaces
workers.json                     # Sample data
```

## 🧩 Components

### Core Components
- **`Navbar`**: Sticky responsive navigation with SolveEase branding
- **`WorkerCard`**: Individual worker display with hover effects and contact button
- **`FilterBar`**: Service and price filtering with clear functionality
- **`Pagination`**: 3-page navigation system with Previous/Next buttons
- **`ErrorBoundary`**: Error handling with user-friendly recovery options
- **`SkeletonCard`**: Loading animation for better UX

### Performance Optimizations
- **React.memo** for component memoization
- **useMemo** for expensive calculations
- **useCallback** for function memoization
- **Lazy loading** for images and components
- **API caching** to prevent redundant requests

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Styling

The project uses **Tailwind CSS** for styling with:
- Responsive design classes (`sm:`, `md:`, `lg:`, `xl:`)
- Custom color palette with blue accent colors
- Hover effects and smooth transitions
- Modern shadows and rounded corners
- Mobile-first approach

## 📱 Responsive Design

- **Mobile**: Single column grid, simplified navigation
- **Tablet**: 2-column grid, condensed filters
- **Desktop**: 3-4 column grid, full feature set
- **Large screens**: 4+ columns for optimal space usage

## 🔌 API Integration

### Endpoints
- `GET /api/workers` - Fetch all workers with pagination
- `GET /api/services` - Get available service categories

### Features
- Loading states with skeleton components
- Error handling with user-friendly messages
- Simple caching mechanism (5-minute duration)
- TypeScript interfaces for type safety

## 🏗️ Assignment Requirements Completed

✅ **Task 1**: Fixed card layout and responsiveness  
✅ **Task 2**: Added sticky navbar component  
✅ **Task 3**: Implemented performance optimizations  
✅ **Task 4**: Added pagination (12 items per page)  
✅ **Task 5**: Service and price filters  
✅ **Task 6**: Bug fixes and code cleanup  
✅ **Task 7**: Complete API integration  


## 👨‍💻 Author

**Your Name**
- GitHub: [@tribhuvan-Kumar](https://github.com/tribhuvan-Kumar/)
- LinkedIn: [tribhuvan-kumar](https://www.linkedin.com/in/tribhuvan-kumar/)
