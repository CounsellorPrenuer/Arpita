# Design Guidelines for Dr. Arpita's Personal Branding Website (Skillzy)

## Design Approach
**Reference-Based Approach**: Inspired by the modern, polished UI/UX of leadcrestconsulting.com, adapted for a vibrant multi-color corporate palette that reflects Dr. Arpita's dynamic professional brand.

## Color Palette

### Foundation Colors
- **White**: Primary background for clean, professional sections
- **Black/Charcoal (#1a1a1a)**: Text and contrast elements

### Brand Colors
- **Blue**: Primary brand color for UI elements, section backgrounds, and links
- **Green**: Secondary brand color for sections and accents

### Action Accents (Use Strategically and Sparingly)
- **Red**: High-priority CTAs and key highlights
- **Yellow**: Important icons and attention-drawing elements

**Color Strategy**: Maintain a clean White/Black foundation while using Blue and Green as the primary brand colors. Reserve Red and Yellow for strategic emphasis on calls-to-action and key achievements to create energy and draw attention.

## Typography
- **Headings**: Poppins (bold, modern, professional)
- **Body Text**: Inter (clean, highly readable)
- **Hierarchy**: Large, impactful headlines (text-4xl to text-6xl) for hero sections, clear section titles (text-3xl), and comfortable body text (text-base to text-lg)

## Layout System
- **Spacing Units**: Tailwind units of 4, 6, 8, 12, 16, 20, 24, 32 (p-4, py-8, gap-6, etc.)
- **Max Width**: Container max-width of 7xl (max-w-7xl) for main content sections
- **Grid Systems**: Use 2-3 column grids for service cards, 3-4 columns for stat displays, responsive stacking on mobile

## Visual Style Elements

### Glassmorphism & Depth
- Semi-transparent backgrounds with blur effects (bg-white/10 backdrop-blur-lg)
- Soft shadows (shadow-lg, shadow-xl) for cards and elevated elements
- Layered depth for navbar and key components

### Hover Effects
- Smooth transitions (transition-all duration-300)
- Scale transforms on cards (hover:scale-105)
- Color shifts on buttons and interactive elements
- Elevated shadows on hover (hover:shadow-2xl)

### Animations
- Subtle on-scroll fade-in animations for section reveals
- Slide-in effects for cards and content blocks
- Smooth scroll behavior between sections

## Component Library

### Navbar
- **Style**: Sticky (sticky top-0), semi-transparent with backdrop blur
- **Layout**: Skillzy logo (left), navigation links (center), "Book a Consultation" CTA button (right)
- **Effect**: Becomes more opaque on scroll

### Hero Section
- **Layout**: Full-width, dynamic design with compelling headline and sub-headline
- **Stats Display**: Four prominent icon-based stat boxes arranged horizontally:
  - 20+ Years HR & L&OD Experience
  - 41,100+ Lives Transformed
  - ICF Certified Executive Coach
  - Multi-Award-Winning Leader
- **CTA**: Primary action button below the stats
- **Background**: Consider a professional gradient or subtle pattern

### Service Cards (Expertise Section)
- **Design**: Premium card style with soft shadows and hover lift effects
- **Layout**: Responsive grid (2-3 columns desktop, stacking on mobile)
- **Content**: Icon at top, service title, brief description
- **Two Sub-sections**: 
  1. Coaching Services (6 cards): Executive, Leadership, Organizational Development, Life, Career, Wellness
  2. Corporate & Academic Programs (4 cards): Career Guidance, Workshops, Admission Guidance, Custom Programs

### Awards Section
- **Layout**: Elegant scrolling carousel OR prestigious grid layout
- **Style**: High-end presentation with award icons/badges
- **Content**: Showcase major awards prominently (Mahatma Gandhi Samman, Best Executive Coach, Iconic Women Leader, Top 10 Women Leaders)

### About Me Section
- **Layout**: Two-column layout (desktop) - Professional placeholder image (left), detailed bio (right)
- **Image Note**: CRITICAL - Use high-quality placeholder image of a female corporate leader; mark clearly for client replacement
- **Certifications Sub-section**: Visually distinct display of key credentials (ICF, IAPCCT, Dale Carnegie, MEPSC, NLP Coach) with badge-style presentation

### Packages Section
- **Layout**: 2-3 pricing cards in a horizontal layout
- **Card Design**: Clean, bordered cards with clear package details
- **Content**: Package name, description, features list
- **CTA**: "Enroll Now" button integrated with Razorpay (vibrant accent color - Red or Yellow)

### Contact Section
- **Layout**: Two-column - Contact form (left), contact details and social media (right)
- **Form Elements**: Name, Email, Phone, Message with validation
- **Contact Info**: Email (info@skillzy.in), Phone (+91 63620 74132), Social media icons
- **Success State**: "Thank you!" message display

### Footer
- **Style**: Comprehensive, multi-column layout
- **Content**: Skillzy branding, quick links, social media handles, all Skillzy website links
- **Color**: Darker background (charcoal/black) with white text

## Responsive Design
- **Mobile-First**: All sections stack gracefully on mobile
- **Breakpoints**: Mobile (default), Tablet (md:), Desktop (lg:), Wide (xl:)
- **Touch-Friendly**: Adequate spacing for touch targets on mobile devices

## Images
- **Logo**: Skillzy logo in navbar (provided URL)
- **Profile Picture**: Professional placeholder image of female corporate leader in About Me section (mark for replacement)
- **Icons**: Use for stats, services, awards, and certifications sections
- **Decorative Elements**: Subtle background patterns or gradients where appropriate

## Key Differentiators
- **Vibrant Yet Professional**: Balance the multi-color palette to maintain credibility while showing energy
- **Stats-Driven**: Prominently display impressive numbers (20+ years, 41,100+ lives)
- **Award Emphasis**: Create visual prestige around her recognition and achievements
- **Clear CTAs**: Multiple strategic calls-to-action (Book Consultation, Enroll Now, Contact)
- **Integrated Payments**: Seamless Razorpay integration for immediate conversion

## Accessibility
- Maintain strong color contrast ratios
- Clear focus states for keyboard navigation
- Readable font sizes (minimum 16px for body text)
- Alt text for all images
- Semantic HTML structure