# Pokémon Browser - Frontend

A modern, SSR-first Next.js application for browsing and searching Pokémon data. Built as a technical challenge demonstrating clean architecture, testing discipline, and thoughtful technical decisions.

## 🎯 Project Overview

This frontend application provides a user-friendly interface for exploring Pokémon data from the PokeAPI. It features authentication, search, sorting, pagination, and detailed Pokémon views with a beautiful, responsive design following Pokémon design patterns.

**Company:** Ballast Lane  
**Position:** Full Stack Developer (Frontend-focused)

## 🚀 Features

- **Authentication System**
  - Secure login with JWT token management
  - Cookie-based session management
  - Protected routes via Next.js middleware

- **Pokémon Browsing**
  - Paginated list view with 20 items per page
  - Search functionality with debounced input
  - Sort by name or number (ascending/descending)
  - Detailed Pokémon view with abilities, moves, and forms
  - Navigation between Pokémon (previous/next)

- **User Experience**
  - SSR-first architecture for fast initial loads and SEO
  - Smooth client-side navigation
  - Image error handling with fallback
  - Responsive design with Pokémon-themed styling
  - Loading states and error boundaries

## 🛠️ Tech Stack

### Core Framework
- **Next.js 16** (App Router) - SSR, routing, middleware
- **React 19** - UI library with React Compiler enabled
- **TypeScript** - Type safety (strict mode)

### State Management
- **Zustand** - UI state only (search term, sort preferences)
- **TanStack Query v5** - Server state, data fetching, mutations

### Styling
- **Tailwind CSS v4** - Utility-first CSS framework
- **Custom Design System** - Pokémon-themed colors, typography, and components

### Testing
- **Vitest** - Fast unit test runner
- **React Testing Library** - Component testing utilities
- **jsdom** - DOM environment for tests

### Other Libraries
- **js-cookie** - Cookie management for authentication
- **@vitejs/plugin-react** - React plugin for Vite/Vitest

## 📐 Architecture

### SSR-First Hybrid Architecture

This application uses a **hybrid SSR architecture** that combines the best of server-side and client-side rendering:

1. **Initial Load (SSR):** Server Components fetch data for SEO and fast initial render
2. **Subsequent Navigation (CSR):** React Query handles pagination, search, and mutations
3. **Auth Protection:** Next.js Middleware checks cookies at the edge

### Data Flow

| Page/Action | Where | Method | Why |
|-------------|-------|--------|-----|
| Initial Pokemon list | Server Component | `serverFetch` | SEO, fast initial load |
| Pokemon detail page | Server Component | `serverFetch` | SEO for each Pokemon |
| Pagination (next/prev) | Client Component | React Query | Fast navigation |
| Search/Filter | Client Component | React Query | Server-side filtering |
| Login | Client Component | React Query mutation | User interaction |
| Logout | Client Component | Clear cookie + redirect | User interaction |

### Authentication Flow

```
1. User submits login form (Client Component)
2. React Query mutation calls POST /auth/login
3. Backend validates credentials, returns JWT
4. Frontend stores JWT in cookie (js-cookie)
5. Middleware sees cookie on next request → allows access
6. Server Components read cookie → fetch data with token
7. On logout: remove cookie → middleware redirects to /login
```

## 📁 Project Structure

```
src/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Server: Root layout with providers
│   ├── page.tsx                # Server: Root redirect based on auth
│   ├── login/
│   │   └── page.tsx            # Client: Login form page
│   ├── pokemon/
│   │   ├── page.tsx            # Server: Prefetch initial list
│   │   ├── PokemonPageClient.tsx  # Client: Interactive list
│   │   └── [id]/
│   │       ├── page.tsx        # Server: Prefetch detail
│   │       └── PokemonDetailClient.tsx  # Client: Detail view
│   ├── error.tsx               # Error boundary
│   └── not-found.tsx           # 404 page
│
├── features/                   # Feature modules
│   ├── auth/
│   │   ├── components/         # LoginForm.tsx
│   │   ├── services/           # authApi.ts (with cookie management)
│   │   └── types/              # auth.types.ts
│   │
│   └── pokemon/
│       ├── components/         # PokemonCard, PokemonList, SearchBar, etc.
│       ├── hooks/              # usePokemonList, usePokemonDetail
│       ├── services/           # pokemonApi.ts
│       ├── types/              # pokemon.types.ts
│       └── utils/              # getTypeColor.ts
│
├── shared/
│   ├── components/             # Button, Input, Layout, icons
│   ├── hooks/                  # useDebounce
│   ├── lib/                    # apiClient.ts, serverApiClient.ts
│   ├── stores/                 # uiStore.ts (Zustand - UI state only)
│   └── providers/              # QueryProvider.tsx
│
├── styles/
│   └── globals.css             # Global styles, Tailwind imports, design tokens
│
middleware.ts                   # Auth protection at edge
```

## 🚦 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn
- Backend API running (see backend repository)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend-pkmn
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```bash
cp .env.example .env.local
```

4. Configure environment variables:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
API_URL=http://localhost:3001
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests once
- `npm run test:watch` - Run tests in watch mode
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage report

## 🧪 Testing

The project uses Vitest and React Testing Library for testing. Tests are organized by feature and include:

- **Unit Tests:** Component tests, hook tests, utility tests
- **Integration Tests:** Login flow, navigation flows
- **Middleware Tests:** Route protection logic

Run tests:
```bash
npm test
```

Watch mode:
```bash
npm run test:watch
```

## 🎨 Design System

The application follows a custom Pokémon-themed design system:

- **Colors:** Primary red (#DC0A2D), type-specific colors, grayscale palette
- **Typography:** Roboto font family with defined text styles (headline, subtitle, body, caption)
- **Shadows:** Elevation system (elevation-2, elevation-6, inner-shadow-2)
- **Components:** Consistent button styles, input styles, card layouts

See `src/styles/globals.css` for design tokens and utilities.

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Public API URL (used in client components) | Yes |
| `API_URL` | API URL (used in server components) | Yes |

## 🏗️ Key Architectural Decisions

1. **SSR-First:** Server Components fetch initial data for SEO and performance
2. **Feature-Based Structure:** Code organized by features for better maintainability
3. **Separation of Concerns:** Clear boundaries between UI state (Zustand) and server state (React Query)
4. **Type Safety:** Strict TypeScript configuration throughout
5. **Cookie-Based Auth:** Simple, secure authentication using HTTP-only cookies
6. **Edge Protection:** Middleware handles route protection at the edge

## 📚 Documentation

- [Product Requirements Document](./docs/PRODUCT_REQUIREMENTS_DOCUMENT.md)
- [User Stories](./docs/USER_STORIES.md)
- [Test Cases](./docs/TEST_CASES.md)
- [Milestones](./docs/MILESTONES.md)
- [GenAI Usage](./GENAI_USAGE.md)

## 👤 Author

**Johan Méndez**
- LinkedIn: [johanemendezg](https://www.linkedin.com/in/johanemendezg/)

## 📝 License

ISC
