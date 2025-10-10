# Dr. Arpita's Personal Branding Website (Skillzy)

## Overview

This is a modern, dynamic personal branding website for Dr. Arpita, an award-winning ICF Certified Executive Coach and Founder of CHERRYSKILLZ Learning Pvt. Ltd. (Skillzy). The website serves as a comprehensive platform showcasing her expertise in executive coaching, leadership development, career guidance, and corporate training. Built as a single-page application with smooth scrolling sections, it features a vibrant multi-color corporate design inspired by modern UI/UX principles.

The website includes sections for:
- Hero introduction with key statistics
- Coaching and expertise services
- Awards and recognition
- Personal biography and certifications
- Pricing packages for different student segments (8-9, 10-12, college, working professionals)
- Contact form and social media integration
- Admin dashboard for managing leads, bookings, and blog posts

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite for fast development and optimized production builds
- **Styling:** Tailwind CSS with custom design system
- **UI Components:** Radix UI primitives with custom shadcn/ui components
- **State Management:** TanStack Query (React Query) for server state
- **Routing:** Wouter for lightweight client-side routing
- **Animations:** CSS transitions with Intersection Observer API for scroll-based animations

**Design System:**
- Color palette: Blue and Green as primary brand colors, with Red and Yellow as strategic accent colors for CTAs
- Typography: Poppins for headings, Inter for body text
- Glassmorphism effects with backdrop blur and semi-transparent backgrounds
- Smooth hover effects with scale transforms and shadow elevation
- Responsive grid layouts with Tailwind spacing units (4, 6, 8, 12, 16, 20, 24, 32)

**Key Architectural Decisions:**
- Single-page application with section-based navigation for seamless user experience
- Component-driven architecture with reusable UI components in `client/src/components/ui/`
- Custom ServiceCard component for consistent service presentation
- Form handling with React Hook Form and Zod validation
- Optimistic UI updates with TanStack Query mutations

### Backend Architecture

**Technology Stack:**
- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js for REST API
- **Database ORM:** Drizzle ORM with PostgreSQL dialect
- **Database Provider:** Neon serverless PostgreSQL
- **Session Management:** PostgreSQL-backed sessions with connect-pg-simple

**API Structure:**
- RESTful endpoints under `/api` prefix
- Admin routes for dashboard statistics and data management
- Public routes for contact form, bookings, and blog posts
- Middleware for request logging and error handling

**Key Architectural Decisions:**
- In-memory storage abstraction (MemStorage) for development, easily swappable with database implementation
- Zod schema validation shared between frontend and backend via `@shared/schema`
- Separation of concerns with dedicated storage layer (`server/storage.ts`)
- Type-safe API responses using TypeScript interfaces

### Data Storage Solutions

**Database Schema (PostgreSQL via Drizzle ORM):**

**Core Tables:**
- `users` - Admin authentication (id, username, password)
- `bookings` - Package purchase records (id, name, email, phone, packageType, packageName, price, createdAt)
- `contacts` - Contact form submissions (id, name, email, phone, message, createdAt)
- `payments` - Payment transaction records (id, orderId, amount, customerName, customerEmail, status, createdAt)
- `downloads` - Resource download tracking (id, resourceName, userEmail, downloadUrl, createdAt)
- `blog_posts` - Blog content management (id, title, category, content, imageUrl, published, createdAt, updatedAt)

**Key Design Decisions:**
- UUID primary keys for all tables using `gen_random_uuid()`
- Timestamp fields with automatic `defaultNow()` for audit trails
- Schema-first approach with Drizzle Zod for runtime validation
- Shared schema definitions between client and server for type safety

### Authentication & Authorization

**Current Implementation:**
- Session-based authentication using Express sessions
- PostgreSQL session store with connect-pg-simple
- Admin-only routes protected by authentication middleware
- No user registration - admin access only

**Security Considerations:**
- Environment-based database credentials
- HTTP-only session cookies
- CORS configuration for API access

## External Dependencies

### Third-Party Services

**Database:**
- **Neon Serverless PostgreSQL** - Scalable PostgreSQL database with automatic scaling and branching capabilities
- Connection via `@neondatabase/serverless` driver
- Configuration: `DATABASE_URL` environment variable required

**UI Component Library:**
- **Radix UI** - Comprehensive set of unstyled, accessible component primitives
- Components used: Dialog, Dropdown, Popover, Toast, Accordion, Tabs, Select, and 20+ others
- All components customized with Tailwind CSS via shadcn/ui pattern

**Development Tools:**
- **Replit Integration:** Vite plugins for runtime error overlay, cartographer, and dev banner (development only)
- **Drizzle Kit:** Database migration and schema management CLI tool

### Key NPM Packages

**Frontend:**
- `@tanstack/react-query` (v5.60.5) - Server state management and caching
- `react-hook-form` + `@hookform/resolvers` - Form handling and validation
- `zod` + `drizzle-zod` - Schema validation
- `class-variance-authority` + `clsx` + `tailwind-merge` - Dynamic className generation
- `date-fns` - Date formatting and manipulation
- `embla-carousel-react` - Touch-friendly carousel component
- `cmdk` - Command menu / search component
- `vaul` - Drawer component
- `input-otp` - OTP input component
- `recharts` - Charting library for analytics

**Backend:**
- `drizzle-orm` (v0.39.1) - TypeScript ORM
- `express` + `express-session` - Web server and session management
- `connect-pg-simple` - PostgreSQL session store
- `nanoid` - Unique ID generation
- `xlsx` - Excel export functionality for admin dashboard

**Build & Development:**
- `tsx` - TypeScript execution for development
- `esbuild` - Fast JavaScript bundler for production builds
- `vite` - Frontend build tool and dev server
- `tailwindcss` + `autoprefixer` + `postcss` - CSS processing

### Asset Management

**Static Assets:**
- Logo stored in `attached_assets/logo_1760012244683.png`
- Vite alias `@assets` pointing to `attached_assets` directory
- Profile picture placeholder requirement (not provided, needs professional female corporate leader image)

**Font Integration:**
- Google Fonts preconnect for performance
- Poppins (weights: 400, 500, 600, 700, 800) for headings
- Inter (weights: 300, 400, 500, 600, 700) for body text